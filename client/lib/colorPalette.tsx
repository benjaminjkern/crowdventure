import React, {
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { ThemeProvider } from "react-jss";
import { UnsafeModeContext } from "./unsafeMode";
import GlobalStyleProvider from "./dynamicGlobalStyles";

const getPalette = (unsafeMode: boolean) => ({
    rootColor: [
        "rgb(80, 160, 224)",
        "rgb(100, 180, 244)",
        "rgb(158, 232, 255)",
    ],
    errorColor: ["rgb(224,80,80)", "rgb(244,100,100)", "rgb(255,120,120)"],
    textColor: unsafeMode ? "white" : "black",
    mutedTextColor: unsafeMode ? "darkgray" : "gray",
    backgroundColor: unsafeMode
        ? ["rgb(34,34,34)", "rgb(41,41,41)", "rgb(50,50,50)"]
        : ["white", "white", "white"],
    lightBackgroundColor: unsafeMode ? "rgb(60,60,70)" : "rgb(230,240,255)",
    grayColor: ["#777", "#888", "#999"],
});

export type PaletteType = {
    rootColor: string[];
    errorColor: string[];
    textColor: string;
    mutedTextColor: string;
    backgroundColor: string[];
    lightBackgroundColor: string;
    grayColor: string[];
};

export const PaletteContext = createContext<PaletteType>(getPalette(false)); // Unsafe mode default value = false

const PaletteProvider = ({ children }: { readonly children: ReactNode }) => {
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
