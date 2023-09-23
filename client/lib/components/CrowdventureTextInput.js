import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";

const CrowdventureTextInput = ({ value, onChangeText, ...props }) => {
    const { backgroundColor } = useContext(PaletteContext);
    return (
        <input
            onChange={(e) => onChangeText(e.target.value)}
            style={{ backgroundColor: backgroundColor[2] }}
            value={value}
            {...props}
        />
    );
};

export default CrowdventureTextInput;
