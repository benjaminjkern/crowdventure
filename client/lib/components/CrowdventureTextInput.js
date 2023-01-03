import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";

const CrowdventureTextInput = ({ value, onChangeText }) => {
    const { backgroundColor } = useContext(PaletteContext);
    return (
        <input
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            style={{ backgroundColor: backgroundColor[2] }}
        />
    );
};

export default CrowdventureTextInput;
