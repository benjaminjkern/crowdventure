import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { attachStyleListener } from "../attachStyleListener";

const CrowdventureTextInput = ({
    value = "",
    onChangeText = () => {},
    style = {},
    rows = 1,
    ...props
}) => {
    const { backgroundColor, lightBackgroundColor, textColor } =
        useContext(PaletteContext);

    const appliedProps = {
        onChange: (e) => onChangeText(e.target.value),
        style: {
            backgroundColor: backgroundColor[2],
            color: textColor,
            border: `1px solid ${lightBackgroundColor}`,
            padding: 5,
            borderRadius: 5,
            width: "100%",
            resize: "vertical",
            ...style,
        },
        rows,
        ...attachStyleListener("focus", {
            outline: "none",
            backgroundColor: lightBackgroundColor,
        }),
        ...props,
    };
    if (value.type === "statelessValue") {
        appliedProps.value = value.initialValue;
        appliedProps.ref = value.ref;
    }
    if (rows > 1) return <textarea {...appliedProps} />;
    return <input {...appliedProps} />;
};

export default CrowdventureTextInput;
