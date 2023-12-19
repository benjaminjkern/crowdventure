// import { TABLES } from "+/server/api/databaseCalls";
import fs from "fs";

const getAllKeysForTable = (table) => {
    const allObjects = JSON.parse(
        fs.readFileSync(`./savedDb/${table}.json`, "utf-8")
    );
    const keys = {};
    for (const obj of allObjects) {
        const objKeys = Object.keys(obj);
        for (const key of objKeys) {
            if (!keys[key]) keys[key] = {};
            if (typeof obj[key] === "object") {
                if (obj[key] === null) keys[key].null = true;
                else console.log(obj[key]);
            } else keys[key][typeof obj[key]] = true;
        }
        for (const key of Object.keys(keys)) {
            if (!objKeys.includes(key)) keys[key][undefined] = true;
        }
    }
    for (const key of Object.keys(keys)) {
        const types = Object.keys(keys[key]);
        console.log(
            `${key}${types.includes("undefined") ? "?" : ""}: ${Object.keys(
                keys[key]
            )
                .filter((a) => a !== "undefined")
                .join(" | ")};`
        );
    }
};

getAllKeysForTable("Views");
