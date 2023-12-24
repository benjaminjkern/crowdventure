import React, {
    type ReactNode,
    createContext,
    useEffect,
    useState,
} from "react";
import LoadingBox from "./components/LoadingBox";
import apiClient from "./apiClient";
import { type Account } from "@/types/models";

type UserContextType = {
    user: Account | null;
    setUser: (newUser?: Account) => void;
};

export const UserContext = createContext<UserContextType>(
    {} as UserContextType
);

const UserProvider = ({ children }: { readonly children: ReactNode }) => {
    const [user, setUser] = useState<Account | null>();

    const saveUser = (newUser?: Account) => {
        if (newUser) localStorage.setItem("savedUser", JSON.stringify(newUser));
        else localStorage.removeItem("savedUser");

        setUser(newUser ?? null);
    };

    const relogin = async (savedUser: Account) => {
        const response = await apiClient.provide("post", "/account/login", {
            screenName: savedUser.screenName,
        });
        if (response.status === "error") {
            saveUser();
            return;
        }
        setUser(response.data);
    };

    useEffect(() => {
        console.log("RUN");
        const savedUserJSON = localStorage.getItem("savedUser");
        if (!savedUserJSON) {
            setUser(null);
            return;
        }
        try {
            const savedUser = JSON.parse(savedUserJSON) as Account;
            relogin(savedUser);
        } catch {
            saveUser();
        }
    }, []);

    if (user === undefined) return <LoadingBox />;

    return (
        <UserContext.Provider value={{ user, setUser: saveUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
