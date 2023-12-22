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
    const [user, setUser] = useState<Account>();

    const saveUser = (newUser?: Account) => {
        if (newUser) localStorage.setItem("savedUser", JSON.stringify(newUser));
        else localStorage.removeItem("savedUser");

        setUser(newUser);
    };

    const relogin = async (savedUser: Account) => {
        const response = await apiClient.provide("post", "/account/login", {
            screenName: savedUser.screenName,
        });
        if (response.status === "error") return alert(response.error);
        setUser(response.data);
    };

    useEffect(() => {
        const savedUserJSON = localStorage.getItem("savedUser");
        if (!savedUserJSON) {
            setUser(undefined);
            return;
        }
        const savedUser = JSON.parse(savedUserJSON) as Account;
        setUser(savedUser);
        relogin(savedUser);
    }, []);

    if (user === undefined) return <LoadingBox />;

    return (
        <UserContext.Provider value={{ user, setUser: saveUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
