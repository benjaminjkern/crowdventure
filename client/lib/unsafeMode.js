import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

export const UnsafeModeContext = createContext();

const UnsafeModeProvider = ({ children }) => {
    // eslint-disable-next-line react/hook-use-state
    const [unsafeMode, setUnsafeModeReal] = useState(false);

    useEffect(() => {
        setUnsafeModeReal(localStorage.getItem("unsafeMode") === "true");
    }, []);

    const setUnsafeMode = (value) => {
        localStorage.setItem("unsafeMode", String(Boolean(value)));
        setUnsafeModeReal(Boolean(value));
    };

    const value = useMemo(() => ({ unsafeMode, setUnsafeMode }), [unsafeMode]);

    return (
        <UnsafeModeContext.Provider value={value}>
            {children}
        </UnsafeModeContext.Provider>
    );
};

export default UnsafeModeProvider;
