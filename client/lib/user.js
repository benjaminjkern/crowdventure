import { gql, useLazyQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const [relogin, { data: { loginUser: newUser } = {} }] = useLazyQuery(
        gql``
    );

    useEffect(() => {
        if (newUser) setUser(newUser);
    }, [newUser]);

    useEffect(() => {
        const screenName = localStorage.getItem("user");
        if (!screenName) return;

        relogin({ variables: { screenName } });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
