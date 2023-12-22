import { z } from "zod";
import { createMiddleware } from "express-zod-api";

import jwt from "jsonwebtoken";
import { getAccount } from "./commonQueries";

const authMiddleware = createMiddleware({
    input: z.object({}),
    middleware: async ({ input: {}, request, response }) => {
        try {
            const token = request.headers.authorization?.split(" ")[1] ?? "";
            const { accountId } = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as { accountId: number };
            const loggedInAccount = await getAccount(accountId);
            return { loggedInAccount, request, response }; // provides endpoints with options.user
        } catch (error) {
            return { request, response };
        }
    },
});

export default authMiddleware;
