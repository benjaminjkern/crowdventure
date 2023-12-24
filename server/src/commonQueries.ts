import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAccountByScreenName = async (screenName: string) =>
    await prisma.account.findUnique({
        where: { screenName },
    });

export const getAccount = async (id: number) =>
    await prisma.account.findUnique({
        where: { id },
    });
// TODO: Make sure accounts are getting their passwords scraped out

export const getChoiceBySlug = async (slug: string) =>
    await prisma.choice.findUnique({
        where: { slug },
        include: { suggestedBy: true },
    });

export const getChoice = async (id: number) =>
    await prisma.choice.findUnique({
        where: { id },
    });

export const getNodeBySlug = async (slug: string) =>
    await prisma.node.findUnique({
        where: { slug },
        include: { owner: true },
    });

export const getNode = async (id: number) =>
    await prisma.node.findUnique({
        where: { id },
    });
