import React, { createContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const [relogin, { data: { loginAccount: newUser } = {} }] = useMutation(
        gql`
            mutation ReLogin($screenName: String!) {
                loginAccount(screenName: $screenName) {
                    screenName
                    profilePicURL
                    isAdmin
                    notifications {
                        seen
                    }
                }
            }
        `
    );

    useEffect(() => {
        if (newUser) setUser(newUser);

        // localStorage.removeItem("screenName");
    }, [newUser]);

    useEffect(() => {
        const screenName = localStorage.getItem("screenName");
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
