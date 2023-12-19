import { TABLES, addItem, getItem } from "../databaseCalls";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "+/server/api/trpc";
import { type Account } from "+/types/models";
import { type StoredAccount } from "+/types/storedTypes";
import { encrypt, flagContent } from "../utils";

export const getAccount = async (screenName: string) =>
    getItem<StoredAccount>(TABLES.ACCOUNT_TABLE, {
        screenName,
    });

// TODO: Look into serializing on aws side
export const serializeAccount: (
    account?: StoredAccount
) => Account | undefined = (account?: StoredAccount) => {
    if (!account) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { encryptedPassword, ...smallAccount } = account;
    return smallAccount;
};

export const accountRouter = createTRPCRouter({
    get: publicProcedure
        .input(z.object({ screenName: z.string() }))
        .query<Account | undefined>(async ({ input: { screenName } }) => {
            return serializeAccount(await getAccount(screenName));
        }),

    login: publicProcedure
        .input(z.object({ screenName: z.string(), password: z.string() }))
        .mutation<Account>(async ({ input: { screenName, password } }) => {
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
        }),
    create: publicProcedure
        .input(
            z.object({
                screenName: z.string().min(1),
                password: z.string().min(1),
            })
        )
        .mutation<Account>(async ({ input: { screenName, password } }) => {
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
        }),
    delete: publicProcedure
        .input(
            z.object({
                screenName: z.string(),
            })
        )
        .mutation<boolean>(async ({ input: { screenName } }) => {
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
        }),
    edit: publicProcedure
        .input(
            z.object({
                screenName: z.string(),
                oldPassword: z.string().optional(),
                newPassword: z.string().optional(),
                bio: z.string().optional(),
                profilePicURL: z.string().optional(),
                hidden: z.boolean().optional(),
                isAdmin: z.boolean().optional(),
            })
        )
        .mutation<Account>(
            async ({
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

                if (args.newPassword)
                    account.encryptedPassword = encrypt(args.newPassword);
                if (args.bio !== undefined) {
                    if (flagContent(args.bio)) {
                        account.hidden = true;
                        // TODO: Send notification (Maybe also put a check on the frontend)
                        // TODO: Find a way to either only hide the bio or make it so if they change the thing that's bad then they'll get unhidden
                    }
                    account.bio = args.bio;
                }
                if (args.profilePicURL !== undefined)
                    account.profilePicURL = args.profilePicURL;
                if (
                    context.loggedInAccount?.isAdmin &&
                    args.hidden !== undefined
                )
                    account.hidden = args.hidden;
                if (
                    context.loggedInAccount?.isAdmin &&
                    args.isAdmin !== undefined
                )
                    account.isAdmin = args.isAdmin;

                // await MutationResolvers.createNotification(
                //     account,
                //     {
                //         content: `Your account was edited by an administrator.`,
                //         link: `/node/${account.screenName}`,
                //     },
                //     context
                // );

                return await databaseCalls.addAccount(account);
            }
        ),
});

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
