import React, { createContext, useEffect, useState } from "react";
import { FULL_ACCOUNT_GQL } from "../pages/account/[accountId]";
import { mutationCall } from "./apiUtils";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const relogin = (savedUser) => {
        mutationCall("loginAccount", FULL_ACCOUNT_GQL, {
            screenName: savedUser.screenName,
        }).then(setUser);
    };

    const saveUser = (newUser) => {
        if (newUser) {
            const smallerUser = {
                screenName: newUser.screenName,
                isAdmin: newUser.isAdmin,
                notifications: newUser.notifications,
            };

            localStorage.setItem("savedUser", JSON.stringify(smallerUser));
        } else localStorage.removeItem("savedUser");

        setUser(newUser);
    };

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("savedUser"));
        if (!savedUser) {
            setUser(null);
            return;
        }
        setUser(savedUser);
        relogin(savedUser);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser: saveUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
