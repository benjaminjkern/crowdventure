// example client-generator.ts
import { writeFileSync } from "fs";
import { Integration } from "express-zod-api";
import { routing } from "+/routing";

writeFileSync(
    "../client/lib/clientDefs.ts",
    new Integration({
        routing,
        variant: "client", // <— optional, see also "types" for a DIY solution
        optionalPropStyle: { withQuestionMark: true, withUndefined: true }, // optional
    }).print(),
    "utf-8"
);
