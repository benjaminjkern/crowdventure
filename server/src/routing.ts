import { type Routing } from "express-zod-api";
import { accountEndpoints } from "./endpoints/Account";
import { choiceEndpoints } from "./endpoints/Choice";
import { nodeEndpoints } from "./endpoints/Node";

// defaultEndpointsFactory.build({
//     methods: undefined,
//     input: undefined,
//     output: undefined,
//     handler: async ({ input: {} }) => {},
// });

export const routing: Routing = {
    account: accountEndpoints,
    choice: choiceEndpoints,
    node: nodeEndpoints,
};
