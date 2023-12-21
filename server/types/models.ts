import { type Prisma } from "@prisma/client";

export type Account = Omit<Prisma.AccountGetPayload<true>, "encryptedPassword">;
export type Node = Prisma.NodeGetPayload<true>;
export type Choice = Prisma.ChoiceGetPayload<true>;
