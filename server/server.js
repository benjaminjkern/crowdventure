import jwt from "jsonwebtoken";
import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { appRouter } from "+/root";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(json()); // TODO: Might not be necessary

app.use(appRouter);

// app.use(async ({ req, res }) => {
//             try {
//                 const token =
//                     req.headers.authorization || req.cookies.token || "";
//                 const { accountScreenName } = jwt.verify(
//                     token,
//                     process.env.JWT_SECRET
//                 );
//                 const loggedInAccount = await databaseCalls.getAccount(
//                     accountScreenName
//                 );
//                 return { loggedInAccount, req, res };
//             } catch (error) {
//                 return { req, res };
//             }
//         })

app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000/`)
);
