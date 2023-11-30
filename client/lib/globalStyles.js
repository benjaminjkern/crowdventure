import { createUseStyles } from "react-jss";
import { PaletteContext } from "./colorPalette";
import { useContext } from "react";

const useDefaultStyles = createUseStyles(() => {
    const { rootColor } = useContext(PaletteContext);
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
                color: rootColor[0],
                textDecoration: "underline",
            },
        },
    };
});

const GlobalStyleProvider = ({ children }) => {
    useDefaultStyles();
    return children;
};

export default GlobalStyleProvider;
