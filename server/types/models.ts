import {
    type Account as PrismaAccount,
    type Node as PrismaNode,
    type Choice as PrismaChoice,
    type Notification as PrismaNotification,
} from "@prisma/client";

export type Account = Omit<PrismaAccount, "encryptedPassword">;
export type Node = PrismaNode;
export type Choice = PrismaChoice;
export type Notification = PrismaNotification;
