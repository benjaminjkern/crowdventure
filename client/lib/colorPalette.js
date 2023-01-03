import React, { createContext, useContext, useEffect, useState } from "react";
import { UnsafeModeContext } from "./unsafeMode";

export const PaletteContext = createContext();

const PaletteProvider = ({ children }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);

    const [palette, setPalette] = useState({
        rootColor: [
            "rgb(80, 160, 224)",
            "rgb(100, 180, 244)",
            "rgb(158, 232, 255)",
        ],
        foregroundColor: unsafeMode ? "white" : "black",
        backgroundColor: unsafeMode
            ? ["rgb(34,34,34)", "rgb(41,41,41)", "rgb(50,50,50)"]
            : ["white", "white", "white"],
    });

    useEffect(() => {
        if (unsafeMode) {
            document.body.style.backgroundImage = `linear-gradient(
            to right,
            rgb(158, 232, 255),
            ${palette.backgroundColor[0]} 10%,
            ${palette.backgroundColor[0]} 90%,
            rgb(158, 232, 255)
        )`;
            document.body.style.color = "rgb(225, 240, 255)";
        } else {
            document.body.style.backgroundImage = `linear-gradient(
            to right,
            rgb(158, 232, 255),
            rgb(245,250,255) 10%,
            rgb(245,250,255) 90%,
            rgb(158, 232, 255)
        )`;
            document.body.style.color = "";
        }
    }, [unsafeMode]);

    return (
        <PaletteContext.Provider value={palette}>
            {children}
        </PaletteContext.Provider>
    );
};

export default PaletteProvider;
