import { type Routing } from "express-zod-api";
import { accountEndpoints } from "./endpoints/Account";
import { choiceEndpoints } from "./endpoints/Choice";
import { nodeEndpoints } from "./endpoints/Node";

export const routing: Routing = {
    account: accountEndpoints,
    choice: choiceEndpoints,
    node: nodeEndpoints,
};
