import React, {
    type ReactNode,
    createContext,
    useEffect,
    useState,
} from "react";
import { mutationCall } from "./apiUtils";
import { LOGGED_IN_USER_GQL } from "./gqlDefs";
import { type Account } from "@/types/models";
import LoadingBox from "./components/LoadingBox";

type UserContextType = {
    user: Account | null;
    setUser: (newUser?: Account) => void;
};

export const UserContext = createContext<UserContextType>(
    {} as UserContextType
);

const UserProvider = ({ children }: { readonly children: ReactNode }) => {
    const [user, setUser] = useState<Account | undefined | null>();

    const saveUser = (newUser?: Account) => {
        if (newUser) localStorage.setItem("savedUser", JSON.stringify(newUser));
        else localStorage.removeItem("savedUser");

        setUser(newUser);
    };

    const relogin = (savedUser: Account) => {
        mutationCall("loginAccount", LOGGED_IN_USER_GQL, {
            screenName: savedUser.screenName,
        }).then(saveUser);
    };

    useEffect(() => {
        const savedUserJSON = localStorage.getItem("savedUser");
        if (!savedUserJSON) {
            setUser(null);
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
