import { z, type ZodTypeAny } from "zod";

// TODO: Use z.date() instead of z.string() for dateCreated

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
    lastUpdated: z.number().int().gte(0).optional(),
    totalNodeViews: z.number().int().gte(0),
    screenName: z.string(),
    isAdmin: z.boolean(),
    totalSuggestionScore: z.number().int(),
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
    lastUpdated: z.number().int().gte(0).optional(),
    from: z.string(),
    score: z.number().int(),
    suggestedBy: z.string(),
    ID: z.string(),
    to: z.string(),
    isCanon: z.boolean(),
    hidden: z.boolean().optional(),
});

// export type StoredNode = {
//     content: string;
//     dateCreated: string;
//     lastUpdated: number;
//     searchTitle: string;
//     storedViews?: number; // TODO: Make this always available
//     views: number;
//     owner: string;
//     ID: string;
//     featured: boolean;
//     title: string;
//     pictureURL?: string;
//     hidden?: boolean; // TODO: Make this always available
//     pictureUnsafe?: boolean; // TODO: Make this always available (ALSO Change this to pictureSafe)
// };

export const NodeSchema = z.object({
    content: z.string(),
    dateCreated: z.string(),
    lastUpdated: z.number().int().gte(0),
    searchTitle: z.string(),
    storedViews: z.number().int().gte(0).optional(),
    views: z.number().int().gte(0),
    owner: z.string(),
    ID: z.string(),
    featured: z.boolean(),
    title: z.string(),
    pictureURL: z.string().optional(),
    hidden: z.boolean().optional(),
    pictureUnsafe: z.boolean().optional(),
});

// type PaginatedResults<T> = {
//     results: T[];
//     lastEvaluatedKey?: AWS.DynamoDB.DocumentClient.Key;
// };

export const makePaginationSchema = <T extends ZodTypeAny>(schema: T) => {
    return z.object({
        results: schema.array(),
        lastEvaluatedKey: z.record(z.string(), z.string()).optional(),
    });
};
