import React, { createContext, useContext, useEffect, useState } from "react";
import { UnsafeModeContext } from "./unsafeMode";

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
            {children}
        </PaletteContext.Provider>
    );
};

export default PaletteProvider;
