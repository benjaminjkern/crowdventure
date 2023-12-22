import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";
import { flagContent } from "+/utils";
import { AccountSchema } from "+/schemas";
import bcrypt from "bcrypt";

import { type Account, PrismaClient } from "@prisma/client";
import { getAccount, getAccountByScreenName } from "+/commonQueries";
const prisma = new PrismaClient();

export const accountEndpoints = {
    getAccount: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ screenName: z.string() }),
        output: z.object({ account: AccountSchema.optional() }),
        handler: async ({ input: { screenName } }) => {
            return {
                account:
                    (await getAccountByScreenName(screenName)) ?? undefined,
            };
        },
    }),
    login: defaultEndpointsFactory.build({
        methods: ["post"],
        input: z.object({ screenName: z.string(), password: z.string() }),
        output: AccountSchema,
        handler: async ({ input: { screenName, password } }) => {
            const account = await getAccountByScreenName(screenName);
            if (!account) throw new Error("That account doesnt exist!");
            if (password) {
                if (!bcrypt.compareSync(password, account.encryptedPassword))
                    throw new Error("Incorrect password!");

                sendLoginToken(context, account); // TODO: Figure out context
            } else if (
                !context.loggedInAccount || // TODO: Figure out context
                context.loggedInAccount.screenName !== account.screenName // TODO: Figure out context
            )
                throw new Error("Failed to re-login!");

            return account;
        },
    }),
    createAccount: defaultEndpointsFactory.build({
        methods: ["post"],
        input: z.object({ screenName: z.string(), password: z.string() }),
        output: AccountSchema,
        handler: async ({ input: { screenName, password } }) => {
            if (flagContent(screenName)) throw new Error("Bad word");
            // TODO: Dont fetch full object
            if (await getAccountByScreenName(screenName))
                throw new Error("That screen name already exists!");

            console.log(`Creating new account with name ${screenName}`);

            const account: Account = {
                screenName,
                encryptedPassword: bcrypt.hashSync(password, 10),
                lastIP: getIP(context),
                dateCreated: new Date().toJSON(),
                isAdmin: false,
                totalSuggestionScore: 0,
                totalNodeViews: 0,
            };

            await prisma.account.create({ data: account });

            sendLoginToken(context, account);

            return account;
        },
    }),
    deleteAccount: defaultEndpointsFactory.build({
        methods: ["delete"],
        input: z.object({
            id: z.number(),
        }),
        output: z.object({
            deleted: z.boolean(),
        }),
        handler: async ({ input: { id } }) => {
            const account = await getAccount(id);
            if (!account) throw new Error("That account doesnt exist!");

            if (
                !context.loggedInAccount?.isAdmin &&
                context.loggedInAccount?.screenName !== account.screenName
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
    editAccount: defaultEndpointsFactory.build({
        methods: ["patch"],
        input: z.object({
            id: z.number(),
            screenName: z.string().optional(),
            oldPassword: z.string().optional(),
            newPassword: z.string().min(1).optional(),
            bio: z.string().min(1).optional(),
            profilePicURL: z.string().min(1).optional(),
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
        }) => {
            const account = await getAccount(id);
            if (!account) throw new Error("That account doesnt exist!");

            if (
                !context.loggedInAccount?.isAdmin &&
                context.loggedInAccount?.screenName !== account.screenName
            )
                throw new Error("No permission!");

            console.log(`Editing Account ${account.screenName}`);
            // TODO: Don't update if nothing is changing

            if (newPassword) {
                if (
                    oldPassword &&
                    bcrypt.compareSync(oldPassword, account.encryptedPassword)
                )
                    account.encryptedPassword = bcrypt.hashSync(
                        newPassword,
                        10
                    );

                // TODO: Let user know that password failed
            }
            if (bio !== undefined) {
                if (flagContent(bio)) {
                    account.hidden = true;
                    // TODO: Send notification (Maybe also put a check on the frontend)
                    // TODO: Find a way to either only hide the bio or make it so if they change the thing that's bad then they'll get unhidden
                }
                account.bio = bio;
            }
            if (profilePicURL !== undefined)
                account.profilePicURL = profilePicURL;
            if (context.loggedInAccount?.isAdmin && hidden !== undefined)
                account.hidden = hidden;
            if (context.loggedInAccount?.isAdmin && isAdmin !== undefined)
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
                where: { screenName: account.screenName },
            });
        },
    }),
};

const sendLoginToken = (context, account) => {
    context.res.set({
        "Access-Control-Expose-Headers": "token",
        token: jwt.sign(
            { accountScreenName: account.screenName },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        ),
    });
    context.loggedInAccount = account;
};
