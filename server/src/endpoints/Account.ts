import { TABLES, addItem } from "+/databaseCalls";

import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";

import { type StoredAccount } from "@/types/storedTypes";
import { encrypt, flagContent } from "+/utils";
import { AccountSchema } from "+/schemas";
import { getAccount, serializeAccount } from "+/modelHelpers";

export const accountEndpoints = {
    getAccount: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ screenName: z.string() }),
        output: z.object({ account: AccountSchema.optional() }),
        handler: async ({ input: { screenName } }) => {
            const account = await getAccount(screenName);
            if (!account) return {};
            return { account: serializeAccount(account) };
        },
    }),
    login: defaultEndpointsFactory.build({
        methods: ["post"],
        input: z.object({ screenName: z.string(), password: z.string() }),
        output: AccountSchema,
        handler: async ({ input: { screenName, password } }) => {
            const account = await getAccount(screenName);
            if (!account) throw new Error("That account doesnt exist!");
            if (password) {
                if (encrypt(password) !== account.encryptedPassword)
                    throw new Error("Incorrect password!");

                sendLoginToken(context, account); // TODO: Figure out context
            } else if (
                !context.loggedInAccount || // TODO: Figure out context
                context.loggedInAccount.screenName !== account.screenName // TODO: Figure out context
            )
                throw new Error("Failed to re-login!");

            return serializeAccount(account);
        },
    }),
    createAccount: defaultEndpointsFactory.build({
        methods: ["post"],
        input: z.object({ screenName: z.string(), password: z.string() }),
        output: AccountSchema,
        handler: async ({ input: { screenName, password } }) => {
            if (flagContent(screenName)) throw new Error("Bad word");
            // TODO: Dont fetch full object
            if (await getAccount(screenName))
                throw new Error("That screen name already exists!");

            console.log(`Creating new account with name ${screenName}`);

            const account = await addItem<StoredAccount>(TABLES.ACCOUNT_TABLE, {
                screenName,
                encryptedPassword: encrypt(password),
                lastIP: getIP(context),
                dateCreated: new Date().toJSON(),
                isAdmin: false,
                totalSuggestionScore: 0,
                totalNodeViews: 0,
            });

            sendLoginToken(context, account);

            return account;
        },
    }),
    deleteAccount: defaultEndpointsFactory.build({
        methods: ["delete"],
        input: z.object({
            screenName: z.string(),
        }),
        output: AccountSchema,
        handler: async ({ input: { screenName } }) => {
            const account = await getAccount(screenName);
            if (!account) throw new Error("That account doesnt exist!");

            if (
                !context.loggedInAccount?.isAdmin &&
                context.loggedInAccount?.screenName !== account.screenName
            )
                throw new Error("No permission!");

            console.log(`Deleting Account ${account.screenName}`);

            // TODO: Make these all one database call instead of O(N) calls
            for (const {
                ID,
            } of await databaseCalls.getChoicesSuggestedByAccount(
                account.screenName
            )) {
                await databaseCalls.removeChoice(ID);
            }
            for (const { ID } of await databaseCalls.getNodesOwnedByAccount(
                account.screenName
            )) {
                await databaseCalls.removeNode(ID);
            }

            return await databaseCalls.removeAccount(account.screenName);
        },
    }),
    editAccount: defaultEndpointsFactory.build({
        methods: ["patch"],
        input: z.object({
            screenName: z.string(),
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
                screenName,
                oldPassword,
                newPassword,
                bio,
                profilePicURL,
                hidden,
                isAdmin,
            },
        }) => {
            const account = await getAccount(screenName);
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
                    encrypt(oldPassword) === account.encryptedPassword
                )
                    account.encryptedPassword = encrypt(newPassword);

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

            return await addItem(TABLES.ACCOUNT_TABLE, account);
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
