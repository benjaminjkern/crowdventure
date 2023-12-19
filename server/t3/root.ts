import { createTRPCRouter } from "+/server/api/trpc";
import { accountRouter } from "+/server/api/routers/Account";
import { nodeRouter } from "+/server/api/routers/Node";
import { choiceRouter } from "+/server/api/routers/Choice";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    account: accountRouter,
    choice: choiceRouter,
    node: nodeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
