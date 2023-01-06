import React, { createContext, useEffect, useState } from "react";
import { FULL_ACCOUNT_GQL } from "../pages/account/[accountId]";
import { mutationCall } from "./apiUtils";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const relogin = (screenName) => {
        mutationCall("loginAccount", FULL_ACCOUNT_GQL, { screenName }).then(
            setUser
        );
    };

    useEffect(() => {
        const screenName = localStorage.getItem("screenName");
        if (!screenName) {
            setUser(null);
            return;
        }

        relogin(screenName);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
