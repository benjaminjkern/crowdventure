import {
    type StoredChoice,
    type StoredAccount,
    type StoredNode,
} from "@/types/storedTypes";
import { TABLES, getItem } from "./databaseCalls";
import { type Account } from "@/types/models";

export const getAccount = async (screenName: string) =>
    await getItem<StoredAccount>(TABLES.ACCOUNT_TABLE, {
        screenName,
    });

// TODO: Look into serializing on aws side
export const serializeAccount = (account: StoredAccount) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { encryptedPassword, ...smallAccount } = account;
    return smallAccount as Account;
};

export const getChoice = async (ID: string) =>
    await getItem<StoredChoice>(TABLES.CHOICE_TABLE, {
        ID,
    });

export const getNode = async (ID: string) =>
    await getItem<StoredNode>(TABLES.NODE_TABLE, {
        ID,
    });
