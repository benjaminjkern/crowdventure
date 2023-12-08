import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import databaseCalls from "./databaseCalls.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
// import cors from "cors";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
(async () => {
    await server.start();
    app.use(
        "/graphql",
        // cors({
        //     origin: [
        //         "https://sandbox.embed.apollographql.com",
        //         "http://localhost:3000",
        //     ],
        //     credentials: true,
        // }),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                try {
                    const token =
                        req.headers.authorization || req.cookies.token || "";
                    const { accountScreenName } = jwt.verify(
                        token,
                        process.env.JWT_SECRET
                    );
                    const loggedInAccount = await databaseCalls.getAccount(
                        accountScreenName
                    );
                    return { loggedInAccount, req, res };
                } catch (error) {
                    return { req, res };
                }
            },
        })
    );

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
