import { defaultEndpointsFactory, type Routing } from "express-zod-api";
import { accountEndpoints } from "./endpoints/Account";
import { choiceEndpoints } from "./endpoints/Choice";
import { nodeEndpoints } from "./endpoints/Node";
import { z } from "zod";

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
    index: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({}),
        output: z.object({ status: z.string() }),
        handler: async () => {
            return {
                status: "ok",
            };
        },
    }),
};
