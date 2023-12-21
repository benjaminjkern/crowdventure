import { type Prisma, PrismaClient } from "@prisma/client";
import fs from "fs";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const saveFullDbLocally = async () => {};

// TODO: Some IDs aren't 8 characters (Maybe increase this to 16 as well)
const storeAccounts = async () => {
    type StoredAccount = {
        lastIP?: string;
        dateCreated: string;
        lastUpdated?: number;
        totalNodeViews: number;
        screenName: string;
        isAdmin: boolean;
        totalSuggestionScore: number;
        encryptedPassword: string; // Hide in real account
        profilePicURL?: null | string;
        bio?: null | string;
        hidden?: boolean;
    };
    const { results: accounts } = JSON.parse(
        fs.readFileSync(`savedDb/Accounts.json`, "utf8")
    ) as { results: StoredAccount[] };

    await prisma.account.createMany({
        data: accounts.map((account) => {
            return {
                screenName: account.screenName,
                isAdmin: account.isAdmin,
                totalSuggestionScore: account.totalSuggestionScore,
                profilePicURL: account.profilePicURL,
                bio: account.bio,
                totalNodeViews: account.totalNodeViews,
                lastIP: account.lastIP ?? "Not tracked",
                encryptedPassword: bcrypt.hashSync(
                    account.encryptedPassword,
                    10
                ),
                hidden: account.hidden ?? false,
                createdAt: new Date(account.dateCreated),
            };
        }),
    });
    console.log("accounts done");
};

const storeNodes = async () => {
    type StoredNode = {
        content: string;
        dateCreated: string;
        lastUpdated: number;
        searchTitle: string;
        storedViews?: number;
        views: number;
        owner: string;
        ID: string;
        featured: boolean;
        title: string;
        pictureURL?: string;
        hidden?: boolean;
        pictureUnsafe?: boolean;
    };

    type StoredSortedNode = {
        lastUpdated: number;
        ID: string;
        idx: string;
        featured: boolean;
        hidden: boolean;
    };

    const { results } = JSON.parse(
        fs.readFileSync(`savedDb/Nodes2.json`, "utf8")
    ) as { results: StoredNode[] };

    const { results: sortedResults } = JSON.parse(
        fs.readFileSync(`savedDb/SortedNodes.json`, "utf8")
    ) as { results: StoredSortedNode[] };

    const nodes: Prisma.NodeCreateManyInput[] = [];
    for (const node of results) {
        const owner = await prisma.account.findUnique({
            where: { screenName: node.owner },
        });
        if (!owner) console.log("node", node.ID, "doesnt have an owner!");
        nodes.push({
            slug: node.ID,
            title: node.title,
            content: node.content,
            createdAt: new Date(node.dateCreated),
            updatedAt: new Date(node.lastUpdated),
            storedViews: node.storedViews ?? 0,
            views: node.views,
            ownerId: owner?.id,
            featured: node.featured,
            pictureURL: node.pictureURL,
            pictureUnsafe: node.pictureUnsafe,
            hidden: node.hidden,
        });
    }

    for (const sortedNode of sortedResults) {
        if (!results.some(({ ID }) => ID === sortedNode.ID))
            console.log(
                "Sorted nodes list has ID",
                sortedNode.ID,
                "but regular nodes list doesnt"
            );
    }

    await prisma.node.createMany({
        data: nodes,
    });
    console.log("nodes done");
};

const storeChoices = async () => {
    type StoredChoice = {
        action: string;
        dateCreated: string;
        lastUpdated?: number;
        from: string;
        score: number;
        suggestedBy: string;
        ID: string;
        to: string;
        isCanon: boolean;
        hidden?: boolean;
    };

    const { results: choiceResults } = JSON.parse(
        fs.readFileSync(`savedDb/Choices.json`, "utf8")
    ) as { results: StoredChoice[] };

    const choices: Prisma.ChoiceCreateManyInput[] = [];
    for (const choice of choiceResults) {
        const fromNode = await prisma.node.findUnique({
            where: { slug: choice.from },
        });
        if (!fromNode)
            throw new Error(`Choice from node ${choice.from} doesnt exist!`);

        const toNode = await prisma.node.findUnique({
            where: { slug: choice.to },
        });
        if (!toNode)
            console.log(
                "Choice",
                choice.ID,
                "tries to go to node",
                choice.to,
                "which doesnt exist!"
            );

        const suggestedBy = await prisma.account.findUnique({
            where: { screenName: choice.suggestedBy },
        });
        if (!suggestedBy)
            console.log(
                "Choice",
                choice.ID,
                "is owned by",
                choice.suggestedBy,
                "but that dont exist!"
            );
        choices.push({
            slug: choice.ID,
            action: choice.action,
            createdAt: new Date(choice.dateCreated),
            hidden: choice.hidden ?? false,
            isCanon: choice.isCanon,
            score: choice.score,

            fromNodeId: fromNode.id,
            toNodeId: toNode?.id,
            suggestedByAccountId: suggestedBy?.id,
        });
    }

    await prisma.choice.createMany({
        data: choices,
    });

    console.log("choices done");
};

const storeFeedback = async () => {
    type StoredFeedback = {
        info: string;
        submittedBy?: string;
        dateCreated: string;
        reporting?: { type: "Node" | "Account" | "Choice"; ID: string };
        IP: string;
        ID: string;
    };

    const { results: feedback } = JSON.parse(
        fs.readFileSync(`savedDb/Feedback.json`, "utf8")
    ) as { results: StoredFeedback[] };

    const feedbackList: Prisma.FeedbackCreateManyInput[] = [];
    for (const fb of feedback) {
        let reportingType, reportingId;
        if (fb.reporting) {
            reportingType = fb.reporting.type as string;
            switch (reportingType) {
                case "Node":
                    reportingId = (
                        await prisma.node.findUnique({
                            where: { slug: fb.reporting.ID },
                        })
                    )?.id;
                    break;
                case "Account":
                    reportingId = (
                        await prisma.account.findUnique({
                            where: { screenName: fb.reporting.ID },
                        })
                    )?.id;
                    break;
                case "Choice":
                    reportingId = (
                        await prisma.choice.findUnique({
                            where: { slug: fb.reporting.ID },
                        })
                    )?.id;
                    break;
                default:
                    throw new Error(`Unknown reporting type: ${reportingType}`);
            }
            if (!reportingId) {
                console.log(
                    `Reporting ${reportingType} not found: ${fb.reporting.ID}`
                );
                reportingType = undefined;
            }
        }
        const submittedBy = await prisma.account.findUnique({
            where: { screenName: fb.submittedBy },
        });

        feedbackList.push({
            info: fb.info,
            reportingType,
            reportingId,
            IP: fb.IP,
            submittedById: submittedBy?.id,
            createdAt: new Date(fb.dateCreated),
        });
    }

    await prisma.feedback.createMany({ data: feedbackList });

    console.log("feedback done");
};

const storeNotifications = async () => {
    type StoredNotification = {
        content: string;
        account: string;
        time: number;
        link?: string;
        ID: string;
        seen: boolean;
    };
    const { results } = JSON.parse(
        fs.readFileSync(`savedDb/Notifications.json`, "utf8")
    ) as { results: StoredNotification[] };

    const data: Prisma.NotificationCreateManyInput[] = [];
    for (const res of results) {
        const account = await prisma.account.findUnique({
            where: { screenName: res.account },
        });
        if (!account) throw new Error(`Account not found: ${res.account}`);

        data.push({
            content: res.content,
            accountId: account.id,
            link: res.link,
            seen: res.seen,
            createdAt: new Date(res.time),
        });
    }

    await prisma.notification.createMany({ data });

    console.log("notifications done");
};

const storeReactions = async () => {
    type Reaction = {
        like: boolean;
        account: string;
        choice: string;
        ID: string;
    };
    const { results } = JSON.parse(
        fs.readFileSync(`savedDb/Reactions.json`, "utf8")
    ) as { results: Reaction[] };

    const data: Prisma.ReactionCreateManyInput[] = [];
    for (const res of results) {
        const account = await prisma.account.findUnique({
            where: { screenName: res.account },
        });
        if (!account) throw new Error(`Account not found: ${res.account}`);

        const choice = await prisma.choice.findUnique({
            where: { slug: res.choice },
        });
        if (!choice) {
            console.log(`Choice not found: ${res.choice}`);
            continue;
        }

        data.push({
            like: res.like,
            accountId: account.id,
            choiceId: choice.id,
        });
    }

    await prisma.reaction.createMany({ data });

    console.log("reactions done");
};

const storeViews = async () => {
    type StoredView = {
        IP: string;
        node: string;
        ID: string;
    };

    const { results } = JSON.parse(
        fs.readFileSync(`savedDb/Views.json`, "utf8")
    ) as { results: StoredView[] };

    const data: Prisma.ViewCreateManyInput[] = [];
    for (const res of results) {
        const node = await prisma.node.findUnique({
            where: { slug: res.node },
        });
        if (!node) {
            console.log(`Node not found: ${res.node}`);
            continue;
        }
        data.push({
            IP: res.IP,
            nodeId: node.id,
        });
    }

    await prisma.view.createMany({ data });

    console.log("views done");
};

const main = async () => {
    await storeAccounts();
    await storeNodes();
    await storeChoices();
    await storeFeedback();
    await storeNotifications();
    await storeReactions();
    await storeViews();
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
