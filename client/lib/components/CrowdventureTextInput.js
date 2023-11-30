import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { attachStyleListener } from "../attachStyleListener";

const CrowdventureTextInput = ({ onChangeText, style, ...props }) => {
    const { backgroundColor, lightBackgroundColor } =
        useContext(PaletteContext);
    return (
        <input
            onChange={(e) => onChangeText(e.target.value)}
            style={{
                backgroundColor: backgroundColor[2],
                border: `1px solid ${lightBackgroundColor}`,
                padding: 5,
                borderRadius: 5,
                width: "100%",
                ...style,
            }}
            {...attachStyleListener("focus", {
                outline: "none",
                backgroundColor: lightBackgroundColor,
            })}
            {...props}
        />
    );
};

export default CrowdventureTextInput;
