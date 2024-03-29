import {
    type Account as PrismaAccount,
    type Node as PrismaNode,
    type Choice as PrismaChoice,
    type Notification as PrismaNotification,
} from "@prisma/client";

export type Account = Omit<PrismaAccount, "encryptedPassword" | "lastIP">;
export type Node = PrismaNode & { owner: Account | null };
export type Choice = PrismaChoice & {
    suggestedBy: Account | null;
    toNode: Node | null;
    fromNode: Node;

    reactions: { like: boolean }[];
};
export type Notification = PrismaNotification;
