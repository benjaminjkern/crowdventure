import { z, type ZodTypeAny } from "zod";
import {
    AccountSchema as ZodAccountSchema,
    ChoiceSchema as ZodChoiceSchema,
    NodeSchema as ZodNodeSchema,
} from "../prisma/generated/zod";

export const AccountSchema = ZodAccountSchema.omit({
    encryptedPassword: true,
    lastIP: true,
});
export const NodeSchema = ZodNodeSchema.extend({
    owner: AccountSchema.nullable(),
});
export const ChoiceSchema = ZodChoiceSchema.extend({
    fromNode: NodeSchema,
    suggestedBy: AccountSchema.nullable(),
    toNode: NodeSchema.nullable(),
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
