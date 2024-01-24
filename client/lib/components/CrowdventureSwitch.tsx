import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";

const CrowdventureSwitch = ({
    value,
    onChange,
    size = 20,
    padding = 2,
}: {
    readonly value: boolean;
    readonly onChange: (s: boolean) => void;
    readonly size?: number;
    readonly padding?: number;
}) => {
    const { lightBackgroundColor, rootColor, textColor } =
        useContext(PaletteContext);
    return (
        <div
            onClick={() => onChange(!value)}
            style={{
                width: size * 2,
                height: size,
                borderRadius: size / 2,
                justifyContent: "center",
                backgroundColor: lightBackgroundColor,
                padding,
                cursor: "pointer",
                outlineWidth: 1,
                outlineStyle: "solid",
                outlineColor: textColor,
            }}
        >
            <div
                style={{
                    position: "relative",
                    transition: "left 0.3s, background-color 0.3s",
                    backgroundColor: value ? rootColor[2] : textColor,
                    width: size - padding * 2,
                    height: size - padding * 2,
                    borderRadius: size, // Overdo it, always a circle
                    left: value ? size : 0,
                }}
            />
        </div>
    );
};

export default CrowdventureSwitch;
