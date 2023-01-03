import React, { createContext, useEffect, useState } from "react";

export const UnsafeModeContext = createContext();

const UnsafeModeProvider = ({ children }) => {
    const [unsafeMode, setUnsafeMode] = useState(false);

    useEffect(() => {
        setUnsafeMode(localStorage.getItem("unsafeMode") === "true");
    }, []);

    return (
        <UnsafeModeContext.Provider value={unsafeMode}>
            {children}
        </UnsafeModeContext.Provider>
    );
};

export default UnsafeModeProvider;
