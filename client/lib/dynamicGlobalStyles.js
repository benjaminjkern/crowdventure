import { createUseStyles } from "react-jss";

const useDefaultStyles = createUseStyles((theme) => {
    // Use theme basically just so react-jss doesnt get mad at me
    const { rootColor, backgroundColor, textColor, lightBackgroundColor } =
        theme;
    return {
        "@global": {
            "*": {
                boxSizing: "border-box",
                fontFamily: "Arial Rounded MT Bold",
                color: textColor,
            },
            /** ***************** Custom Selection ************************/

            "::-moz-selection": {
                background: rootColor[1],
            },

            "::selection": {
                background: rootColor[1],
            },

            /** ***************** Force flex on everything *********************/
            "body, div, nav, footer": {
                display: "flex",
                flexDirection: "column",
            },
            "span, a": {
                display: "inline-flex",
            },
            /** ***************** Overwrite default styles *********************/
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
            input: {
                backgroundColor: backgroundColor[2],
                border: `1px solid ${lightBackgroundColor}`,
                padding: 5,
                borderRadius: 5,
                width: "100%",
            },
            "input:focus": {
                outline: "none",
                backgroundColor: lightBackgroundColor,
            },

            button: {
                border: `1px solid ${rootColor[0]}`,
                padding: 5,
                borderRadius: 5,
                backgroundColor: rootColor[1],
                color: "white",
                width: "100%",
            },
            "button:hover": {
                backgroundColor: rootColor[0],
            },

            /** ***************** Gradient for body *********************/
            body: {
                margin: 0,
                backgroundImage: `linear-gradient(
                    to right,
                    rgb(158, 232, 255),
                    ${backgroundColor[0]} 10%,
                    ${backgroundColor[0]} 90%,
                    rgb(158, 232, 255)
                )`,
            },
        },
    };
});

const GlobalStyleProvider = ({ children }) => {
    useDefaultStyles();
    return children;
};

export default GlobalStyleProvider;
