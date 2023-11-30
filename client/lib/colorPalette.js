import React, { createContext, useContext, useEffect, useState } from "react";
import { UnsafeModeContext } from "./unsafeMode";
import { ThemeProvider, createUseStyles } from "react-jss";

export const PaletteContext = createContext();

const getPalette = (unsafeMode) => ({
    rootColor: [
        "rgb(80, 160, 224)",
        "rgb(100, 180, 244)",
        "rgb(158, 232, 255)",
    ],
    textColor: unsafeMode ? "white" : "black",
    backgroundColor: unsafeMode
        ? ["rgb(34,34,34)", "rgb(41,41,41)", "rgb(50,50,50)"]
        : ["white", "white", "white"],
    borderColor: unsafeMode ? "darkgray" : "lightgray",
});

const useDefaultStyles = createUseStyles((theme) => {
    // Use theme basically just so react-jss doesnt get mad at me
    const { rootColor, backgroundColor, textColor } = theme;
    return {
        "@global": {
            /** ***************** Custom Selection ************************/

            "::-moz-selection": {
                background: rootColor[1],
            },

            "::selection": {
                background: rootColor[1],
            },
            /** ***************** Remove bad defaults - Specific to the links *********************/
            a: {
                color: rootColor[1],
                textDecoration: "none",
            },

            "a:focus, a:hover": {
                textDecoration: "underline",
            },
            body: {
                backgroundImage: `linear-gradient(
                    to right,
                    rgb(158, 232, 255),
                    ${backgroundColor[0]} 10%,
                    ${backgroundColor[0]} 90%,
                    rgb(158, 232, 255)
                )`,
                color: textColor,
            },
        },
    };
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

const GlobalStyleProvider = ({ children }) => {
    useDefaultStyles();
    return children;
};

export default PaletteProvider;
