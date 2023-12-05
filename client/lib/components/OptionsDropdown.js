import React, { useContext, useState } from "react";
import CrowdventureButton from "./CrowdventureButton";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { PaletteContext } from "../colorPalette";

const OptionsDropdown = ({ dropdownOptions, dropdownStyle = {} }) => {
    const [open, setOpen] = useState(false);
    const { textColor, backgroundColor } = useContext(PaletteContext);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
            }}
        >
            <div
                style={{
                    position: "relative",
                    // justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CrowdventureButton
                    onClick={() => setOpen((newOpen) => !newOpen)}
                >
                    Gear
                </CrowdventureButton>
                <div
                    style={{
                        position: "absolute",
                        textAlign: "center",
                        visibility: open ? "visible" : "hidden",
                        fontSize: DEFAULT_TEXT_SIZE * 0.8,
                        padding: 5,
                        borderRadius: 5,
                        backgroundColor: textColor,
                        color: backgroundColor[0],
                        width: 200,
                        right: "100%",
                    }}
                >
                    {dropdownOptions.map(
                        (
                            { active = true, disabled = false, onClick, text },
                            i
                        ) =>
                            active && (
                                <CrowdventureButton
                                    disabled={disabled}
                                    key={i}
                                    onClick={onClick}
                                >
                                    {text}
                                </CrowdventureButton>
                            )
                    )}
                </div>
            </div>
        </div>
    );
};
export default OptionsDropdown;
