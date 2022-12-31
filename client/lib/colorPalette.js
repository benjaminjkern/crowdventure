import React, { createContext, useEffect, useState } from "react";

export const PaletteContext = createContext();

const PaletteProvider = ({ children }) => {
    // const palette = [
    //     "rgb(100, 180, 244)", // original
    //     "rgb(158, 232, 255)", // light
    //     "rgb(80, 160, 224)", //dark

    //     "rgb(34,34,34)",
    //     "rgb(41,41,41)",
    //     "rgb(50,50,50)",

    //     "rgb(80, 150, 200)", // darkest blue
    // ];

    const [palette, setPalette] = useState({
        rootColor: [
            "rgb(80, 160, 224)",
            "rgb(100, 180, 244)",
            "rgb(158, 232, 255)",
        ],
    });

    useEffect(() => {
        const unsafeMode = localStorage.getItem("unsafeMode");
        setPalette({
            ...palette,
            foregroundColor: unsafeMode ? "white" : "black",
            backgroundColor: unsafeMode
                ? ["rgb(34,34,34)", "rgb(41,41,41)", "rgb(50,50,50)"]
                : ["white", "white", "white"],
        });
    }, []);

    return (
        <PaletteContext.Provider value={palette}>
            {children}
        </PaletteContext.Provider>
    );
};

export default PaletteProvider;
