import {
    type StoredAccount,
    type StoredChoice,
    type StoredNode,
} from "./storedTypes";

export type Account = Omit<StoredAccount, "encryptedPassword">;
export type Node = StoredNode;
export type Choice = StoredChoice;
