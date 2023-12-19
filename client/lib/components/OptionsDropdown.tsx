import React, { useContext, useEffect, useRef, useState } from "react";
import CrowdventureButton from "./CrowdventureButton";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { PaletteContext } from "../colorPalette";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const OptionsDropdown = ({
    dropdownOptions,
    wrapperStyle = { justifyContent: "center", alignItems: "flex-end" },
    dropdownStyle = { top: "100%" },
}) => {
    const ref = useRef();
    const [open, setOpen] = useState(false);

    const { backgroundColor } = useContext(PaletteContext);

    useEffect(() => {
        const listener = (e) => {
            if (
                ref.current &&
                (e.target === ref.current ||
                    [...ref.current.children].includes(e.target) ||
                    [...ref.current.children[1].children].includes(e.target))
            )
                return;
            setOpen(false);
        };
        document.addEventListener("click", listener);
        return () => {
            document.removeEventListener("click", listener);
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                ...wrapperStyle,
            }}
        >
            <CrowdventureButton
                buttonType="icon"
                icon={faEllipsis}
                onClick={() => setOpen((newOpen) => !newOpen)}
            />
            <div
                style={{
                    position: "absolute",
                    textAlign: "center",
                    visibility: open ? "visible" : "hidden",
                    fontSize: DEFAULT_TEXT_SIZE * 0.8,
                    backgroundColor: backgroundColor[2],
                    padding: 10,
                    borderRadius: 10,
                    width: 200,
                    zIndex: 2,
                    ...dropdownStyle,
                }}
            >
                {dropdownOptions.map(
                    ({ active = true, disabled = false, onClick, text }, i) =>
                        active &&
                        (text || onClick ? (
                            <CrowdventureButton
                                buttonType="text"
                                disabled={disabled || !onClick}
                                key={i}
                                onClick={onClick}
                                style={{
                                    backgroundColor,
                                }}
                            >
                                {text}
                            </CrowdventureButton>
                        ) : (
                            <hr key={i} />
                        ))
                )}
            </div>
        </div>
    );
};
export default OptionsDropdown;
