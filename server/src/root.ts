import { accountRouter } from "+/routers/Account";
import { nodeRouter } from "+/routers/Node";
import { choiceRouter } from "+/routers/Choice";
import { Router } from "express";

export const appRouter = Router();

appRouter.use("account", accountRouter);
appRouter.use("choice", choiceRouter);
appRouter.use("node", nodeRouter);
