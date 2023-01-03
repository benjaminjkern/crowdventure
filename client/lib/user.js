import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            localStorage.setItem("unsafeMode", false);
            return;
        }

        // Should do some sort of verification here
        setUser(JSON.parse(loggedInUser));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
