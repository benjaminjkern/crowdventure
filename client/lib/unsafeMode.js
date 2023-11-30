import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { UserContext } from "./user";

export const UnsafeModeContext = createContext();

const UnsafeModeProvider = ({ children }) => {
    // eslint-disable-next-line react/hook-use-state
    const [unsafeMode, setUnsafeModeReal] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        setUnsafeModeReal(
            user && localStorage.getItem("unsafeMode") === "true"
        );
    }, [user]);

    const setUnsafeMode = useCallback(
        (value) => {
            localStorage.setItem("unsafeMode", String(Boolean(value)));
            setUnsafeModeReal(user && Boolean(value));
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
