import React, { createContext, useEffect, useState } from "react";
import { mutationCall } from "./apiUtils";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const relogin = (screenName) => {
        mutationCall(
            "loginAccount",
            {
                screenName: 0,
                profilePicURL: 0,
                isAdmin: 0,
                notifications: {
                    time: 0,
                    seen: 0,
                    content: 0,
                    link: 0,
                },
            },
            { screenName }
        ).then(setUser);
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
