import React, {
    type ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { UserContext } from "./user";

type UnsafeModeContextType = {
    unsafeMode: boolean;
    setUnsafeMode: (value: boolean) => void;
};

export const UnsafeModeContext = createContext<UnsafeModeContextType>({
    unsafeMode: false,
} as UnsafeModeContextType);

const UnsafeModeProvider = ({ children }: { children: ReactNode }) => {
    const [unsafeMode, setUnsafeModeReal] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        setUnsafeModeReal(
            user ? localStorage.getItem("unsafeMode") === "true" : false
        );
    }, [user]);

    const setUnsafeMode = useCallback(
        (value: boolean) => {
            localStorage.setItem("unsafeMode", String(value));
            setUnsafeModeReal(user ? value : false);
        },
        [user]
    );

    const value = useMemo(
        () => ({ unsafeMode, setUnsafeMode }),
        [unsafeMode, setUnsafeMode]
    );

    return (
        <UnsafeModeContext.Provider value={value}>
            {children}
        </UnsafeModeContext.Provider>
    );
};

export default UnsafeModeProvider;
