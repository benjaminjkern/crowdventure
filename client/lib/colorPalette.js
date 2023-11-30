import React, { createContext, useContext, useEffect, useState } from "react";
import { UnsafeModeContext } from "./unsafeMode";
import { ThemeProvider } from "react-jss";
import GlobalStyleProvider from "./dynamicGlobalStyles";

export const PaletteContext = createContext();

const getPalette = (unsafeMode) => ({
    rootColor: [
        "rgb(80, 160, 224)",
        "rgb(100, 180, 244)",
        "rgb(158, 232, 255)",
    ],
    textColor: unsafeMode ? "white" : "black",
    mutedTextColor: unsafeMode ? "darkgray" : "gray",
    backgroundColor: unsafeMode
        ? ["rgb(34,34,34)", "rgb(41,41,41)", "rgb(50,50,50)"]
        : ["white", "white", "white"],
    lightBackgroundColor: unsafeMode ? "rgb(60,60,70)" : "rgb(230,240,255)",
});

const PaletteProvider = ({ children }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);

    const [palette, setPalette] = useState(getPalette(unsafeMode));

    useEffect(() => {
        setPalette(getPalette(unsafeMode));
    }, [unsafeMode]);

    return (
        <PaletteContext.Provider value={palette}>
            <ThemeProvider theme={palette}>
                <GlobalStyleProvider>{children}</GlobalStyleProvider>
            </ThemeProvider>
        </PaletteContext.Provider>
    );
};

export default PaletteProvider;
