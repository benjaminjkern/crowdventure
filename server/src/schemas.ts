import { z } from "zod";

// export type StoredAccount = {
//     lastIP?: string; // TODO: Deprecated
//     dateCreated: string;
//     lastUpdated?: number; // TODO: Was never included before for some reason
//     totalNodeViews: number;
//     screenName: string;
//     isAdmin: boolean;
//     totalSuggestionScore: number;
//     encryptedPassword: string; // Hide in real account
//     profilePicURL?: null | string; // TODO: Should get rid of null
//     bio?: null | string; // TODO: Should get rid of null
//     hidden?: boolean; // TODO: Make this always available
// };

export const AccountSchema = z.object({
    lastIP: z.string().optional(),
    dateCreated: z.string(),
    lastUpdated: z.number().optional(),
    totalNodeViews: z.number(),
    screenName: z.string(),
    isAdmin: z.boolean(),
    totalSuggestionScore: z.number(),
    profilePicURL: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    hidden: z.boolean().optional(),
});

// export type StoredChoice = {
//     action: string;
//     dateCreated: string;
//     lastUpdated?: number; // TODO: Was never included before for some reason
//     from: string;
//     score: number;
//     suggestedBy: string;
//     ID: string;
//     to: string;
//     isCanon: boolean;
//     hidden?: boolean; // TODO: Should migrate this to be always available
// };

export const ChoiceSchema = z.object({
    action: z.string(),
    dateCreated: z.string(),
    lastUpdated: z.string().optional(),
    from: z.string(),
    score: z.number(),
    suggestedBy: z.string(),
    ID: z.string(),
    to: z.string(),
    isCanon: z.boolean(),
    hidden: z.boolean().optional(),
});
