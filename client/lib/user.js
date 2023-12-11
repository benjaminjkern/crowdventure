import React, { createContext, useEffect, useState } from "react";
import { mutationCall } from "./apiUtils";
import { LOGGED_IN_USER_GQL } from "./gqlDefs";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const saveUser = (newUser) => {
        if (newUser) {
            const smallerUser = {
                screenName: newUser.screenName,
                isAdmin: newUser.isAdmin,
            };

            localStorage.setItem("savedUser", JSON.stringify(smallerUser));
        } else localStorage.removeItem("savedUser");

        setUser(newUser);
    };

    const relogin = (savedUser) => {
        mutationCall("loginAccount", LOGGED_IN_USER_GQL, {
            screenName: savedUser.screenName,
        }).then(saveUser);
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
