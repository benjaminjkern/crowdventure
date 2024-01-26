import { type ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { type PaletteType } from "./colorPalette";

// This is ONLY FOR COMPONENTS THAT IT DOESNT MAKE SENSE TO PULL OUT SEPARATELY
// For example, doesnt include button because the button has extra functionality that
// I want pulled out with the button, so that's its own component.
// Basically this is for components that I plan on using as-is.

export const DEFAULT_TEXT_SIZE = 18;

const useDefaultStyles = createUseStyles((theme: PaletteType) => {
    // Use theme basically just so react-jss doesnt get mad at me
    const { rootColor, backgroundColor, textColor, lightBackgroundColor } =
        theme;
    return {
        "@global": {
            /** ***************** Custom Selection ************************/
            "::-moz-selection": {
                background: rootColor[1],
            },

            "::selection": {
                background: rootColor[1],
            },

            /** ***************** Force flex on everything *********************/
            /** ***************** Overwrite default styles *********************/
            "h1,h2,h3,h4,h5,h6": {
                display: "inline-flex",
                margin: 0,
            },

            a: {
                color: rootColor[1],
                textDecoration: "none",
            },
            "a:focus, a:hover": {
                textDecoration: "underline",
            },

            hr: {
                width: "100%",
                height: 1,
                border: "none",
                backgroundColor: lightBackgroundColor,
            },

            /** ***************** Gradient for body *********************/
            body: {
                fontSize: DEFAULT_TEXT_SIZE,
                color: textColor,
                "@media (max-width: 800px)": {
                    backgroundImage: `linear-gradient(
                        to right,
                        rgb(158, 232, 255),
                        ${backgroundColor[0]} 30px,
                        ${backgroundColor[0]} calc(100% - 30px),
                        rgb(158, 232, 255)
                    )`,
                },
                "@media (min-width: 801px)": {
                    backgroundImage: `linear-gradient(
                        to right,
                        rgb(158, 232, 255),
                        ${backgroundColor[0]} 10%,
                        ${backgroundColor[0]} 90%,
                        rgb(158, 232, 255)
                    )`,
                },
            },
        },
    };
});

const GlobalStyleProvider = ({ children }: { children: ReactNode }) => {
    useDefaultStyles();
    return children;
};

export default GlobalStyleProvider;
