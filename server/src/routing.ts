import { type Routing } from "express-zod-api";
import { getAccountEndpoint } from "./endpoints/Account";

export const routing: Routing = {
    account: {
        getAccount: getAccountEndpoint,
    },
    // choice: choiceRouter,
    // node: nodeRouter,
};
