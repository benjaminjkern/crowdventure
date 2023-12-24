import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";
import { flagContent, getIP } from "+/utils";
import { AccountSchema } from "+/schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type Account, PrismaClient } from "@prisma/client";
import { getAccount, getAccountByScreenName } from "+/commonQueries";
import authMiddleware from "+/auth";
import { type Response } from "express";
const prisma = new PrismaClient();

export const accountEndpoints = {
    getAccount: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ screenName: z.string() }),
        output: z.object({ account: AccountSchema.nullable() }),
        handler: async ({ input: { screenName } }) => {
            return {
                account: await getAccountByScreenName(screenName),
            };
        },
    }),
    login: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["post"],
        input: z.object({
            screenName: z.string(),
            password: z.string().optional(),
        }),
        output: AccountSchema,
        handler: async ({
            input: { screenName, password },
            options: { response, loggedInAccount },
        }) => {
            const account = await getAccountByScreenName(screenName);
            if (!account) throw new Error("That account doesnt exist!");
            if (password) {
                if (!bcrypt.compareSync(password, account.encryptedPassword))
                    throw new Error("Incorrect password!");
                sendLoginToken(response, account);
            } else if (
                !loggedInAccount ||
                loggedInAccount.screenName !== account.screenName
            )
                throw new Error("Failed to re-login!");

            return account;
        },
    }),
    createAccount: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["post"],
        input: z.object({
            screenName: z.string().min(1),
            password: z.string().min(1),
        }),
        output: AccountSchema,
        handler: async ({
            input: { screenName, password },
            options: { request, response },
        }) => {
            if (flagContent(screenName)) throw new Error("Bad word");
            if (await getAccountByScreenName(screenName))
                throw new Error("That screen name already exists!");

            console.log(`Creating new account with name ${screenName}`);

            const account = await prisma.account.create({
                data: {
                    screenName,
                    encryptedPassword: bcrypt.hashSync(password, 10),
                    lastIP: getIP(request),
                    isAdmin: false,
                    totalSuggestionScore: 0,
                    totalNodeViews: 0,
                },
            });

            sendLoginToken(response, account);

            return account;
        },
    }),
    editAccount: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["patch"],
        input: z.object({
            id: z.number(),
            screenName: z.string().min(1).optional(),
            oldPassword: z.string().optional(),
            newPassword: z.string().min(1).optional(),
            bio: z.string().min(1).nullable().optional(),
            profilePicURL: z.string().min(1).nullable().optional(),
            hidden: z.boolean().optional(),
            isAdmin: z.boolean().optional(),
        }),
        output: AccountSchema,
        handler: async ({
            input: {
                id,
                screenName,
                oldPassword,
                newPassword,
                bio,
                profilePicURL,
                hidden,
                isAdmin,
            },
            options: { loggedInAccount },
        }) => {
            const account = await getAccount(id);
            if (!account) throw new Error("That account doesnt exist!");

            if (
                !loggedInAccount?.isAdmin &&
                loggedInAccount?.screenName !== account.screenName
            )
                throw new Error("No permission!");

            console.log(`Editing Account ${account.screenName}`);
            // TODO: Don't update if nothing is changing

            if (newPassword !== undefined) {
                if (!loggedInAccount?.isAdmin) {
                    if (oldPassword === undefined)
                        throw new Error(
                            "If you want to reset your password, you must provide your old password!"
                        );

                    if (
                        !bcrypt.compareSync(
                            oldPassword,
                            account.encryptedPassword
                        )
                    )
                        throw new Error("Old password is incorrect!");
                }
                account.encryptedPassword = bcrypt.hashSync(newPassword, 10);
            }
            if (screenName !== undefined) {
                if (flagContent(screenName)) {
                    account.hidden = true;
                    // TODO: Send notification (Maybe also put a check on the frontend)
                    // TODO: Find a way to either only hide the bio or make it so if they change the thing that's bad then they'll get unhidden
                }
                account.screenName = screenName;
            }
            if (bio !== undefined) {
                if (bio && flagContent(bio)) {
                    account.hidden = true;
                    // TODO: Send notification (Maybe also put a check on the frontend)
                    // TODO: Find a way to either only hide the bio or make it so if they change the thing that's bad then they'll get unhidden
                }
                account.bio = bio;
            }
            if (profilePicURL !== undefined)
                account.profilePicURL = profilePicURL;
            if (loggedInAccount?.isAdmin && hidden !== undefined)
                account.hidden = hidden;
            if (loggedInAccount?.isAdmin && isAdmin !== undefined)
                account.isAdmin = isAdmin;

            // await MutationResolvers.createNotification(
            //     account,
            //     {
            //         content: `Your account was edited by an administrator.`,
            //         link: `/node/${account.screenName}`,
            //     },
            //     context
            // );

            return await prisma.account.update({
                data: account,
                where: { id },
            });
        },
    }),
    deleteAccount: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["delete"],
        input: z.object({
            id: z.string().transform((x) => parseInt(x)),
        }),
        output: z.object({
            deleted: z.boolean(),
        }),
        handler: async ({ input: { id }, options: { loggedInAccount } }) => {
            const account = await getAccount(id);
            if (!account) throw new Error("That account doesnt exist!");

            if (
                !loggedInAccount?.isAdmin &&
                loggedInAccount?.screenName !== account.screenName
            )
                throw new Error("No permission!");

            console.log(`Deleting Account ${account.screenName}`);

            return {
                deleted: !!(await prisma.account.delete({
                    where: { screenName: account.screenName },
                })),
            };
        },
    }),
};

const sendLoginToken = (response: Response, account: Account) => {
    response.set({
        "Access-Control-Expose-Headers": "authToken",
        authToken: jwt.sign(
            { accountId: account.id },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        ),
    });
};
