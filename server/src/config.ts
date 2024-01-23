import express from "express";
import { createConfig } from "express-zod-api";

export const config = createConfig({
    server: {
        listen: process.env.NODE_ENV === "production" ? 80 : 4000,
        upload: true,
        // TODO: IDK WHAT THIS IS
        compression: true, // affects sendAvatarEndpoint
        rawParser: express.raw(), // required for rawAcceptingEndpoint
    },
    cors: ({ defaultHeaders, request, endpoint, logger }) => ({
        ...defaultHeaders,
        "Access-Control-Allow-Headers": "*",
    }),
    logger: {
        level: "debug",
        color: true,
    },
    // TODO: IDK WHAT THIS IS
    tags: {
        users: "Everything about the users",
        files: "Everything about the files processing",
    },
});

// Uncomment these lines to set the type of logger used:
/*
declare module "express-zod-api" {
  interface LoggerOverrides extends winston.Logger {}
}
*/
