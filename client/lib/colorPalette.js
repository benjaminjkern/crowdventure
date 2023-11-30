import React, { createContext, useContext, useEffect, useState } from "react";
import { UnsafeModeContext } from "./unsafeMode";
import { ThemeProvider, createUseStyles } from "react-jss";

export const PaletteContext = createContext();

const useDefaultStyles = createUseStyles((theme) => {
    // Use theme basically just so react-jss doesnt get mad at me
    const { rootColor } = theme;
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
        },
    };
});

const getPalette = (unsafeMode) => ({
    rootColor: [
        "rgb(80, 160, 224)",
        "rgb(100, 180, 244)",
        "rgb(158, 232, 255)",
    ],
    textColor: unsafeMode ? "white" : "black",
    backgroundColor: unsafeMode
        ? ["rgb(34,34,34)", "rgb(41,41,41)", "rgb(50,50,50)"]
        : ["rgb(255,255,255)", "rgb(220,245,255)", "rgb(180,238,255)"],
    borderColor: "lightgray",
});

const PaletteProvider = ({ children }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);

    const [palette, setPalette] = useState(getPalette(unsafeMode));

    useEffect(() => {
        const newPalette = getPalette(unsafeMode);
        document.body.style.backgroundImage = `linear-gradient(
            to right,
            rgb(158, 232, 255),
            ${newPalette.backgroundColor[0]} 10%,
            ${newPalette.backgroundColor[0]} 90%,
            rgb(158, 232, 255)
        )`;
        document.body.style.color = newPalette.textColor;
        setPalette(newPalette);
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
