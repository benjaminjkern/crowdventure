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
import { UserContext } from "./user";
import LoadingBox from "./components/LoadingBox";

const getPalette = (unsafeMode: boolean) => ({
    rootColor: [
        "rgb(80, 160, 224)",
        "rgb(100, 180, 244)",
        "rgb(158, 232, 255)",
    ] as [string, string, string],
    errorColor: ["rgb(224,80,80)", "rgb(244,100,100)", "rgb(255,120,120)"] as [
        string,
        string,
        string
    ],
    textColor: unsafeMode ? "white" : "black",
    mutedTextColor: unsafeMode ? "darkgray" : "gray",
    backgroundColor: unsafeMode
        ? (["rgb(34,34,34)", "rgb(41,41,41)", "rgb(50,50,50)"] as [
              string,
              string,
              string
          ])
        : (["rgb(210,242,255)", "rgb(235,252,255)", "white"] as [
              string,
              string,
              string
          ]),
    lightBackgroundColor: unsafeMode ? "rgb(60,60,70)" : "rgb(220,245,255)",
    grayColor: ["#777", "#888", "#999"] as [string, string, string],
});

export type PaletteType = {
    rootColor: [string, string, string];
    errorColor: [string, string, string];
    textColor: string;
    mutedTextColor: string;
    backgroundColor: [string, string, string];
    lightBackgroundColor: string;
    grayColor: [string, string, string];
};

export const PaletteContext = createContext<PaletteType>(getPalette(false)); // Unsafe mode default value = false

const PaletteInsideProvider = ({
    children,
}: {
    readonly children: ReactNode;
}) => {
    const { user } = useContext(UserContext);

    if (user === undefined) return <LoadingBox />;

    return children;
};

const PaletteProvider = ({ children }: { readonly children: ReactNode }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);

    const [palette, setPalette] = useState(getPalette(unsafeMode));

    useEffect(() => {
        setPalette(getPalette(unsafeMode));
    }, [unsafeMode]);

    return (
        <PaletteContext.Provider value={palette}>
            <ThemeProvider theme={palette}>
                <GlobalStyleProvider>
                    <PaletteInsideProvider>{children}</PaletteInsideProvider>
                </GlobalStyleProvider>
            </ThemeProvider>
        </PaletteContext.Provider>
    );
};

export default PaletteProvider;
