import { z, type ZodTypeAny } from "zod";
import {
    AccountSchema as ZodAccountSchema,
    ChoiceSchema as ZodChoiceSchema,
    NodeSchema as ZodNodeSchema,
} from "../prisma/generated/zod";

export const AccountSchema = ZodAccountSchema.omit({ encryptedPassword: true });
export const ChoiceSchema = ZodChoiceSchema;
export const NodeSchema = ZodNodeSchema;

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
