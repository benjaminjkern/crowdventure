import React, {
    type CSSProperties,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { PaletteContext } from "../colorPalette";
import { useBlur } from "../hooks";
import CrowdventureButton from "./CrowdventureButton";

export type DropDownOption = {
    active?: boolean;
    disabled?: boolean;
    onClick?: () => unknown;
    text?: string;
};

const OptionsDropdown = ({
    dropdownOptions,
    wrapperStyle = { justifyContent: "center", alignItems: "flex-end" },
    dropdownStyle = { top: "100%" },
}: {
    readonly dropdownOptions: DropDownOption[];
    readonly wrapperStyle?: CSSProperties;
    readonly dropdownStyle?: CSSProperties;
}) => {
    const [open, setOpen] = useState(false);

    const { backgroundColor } = useContext(PaletteContext);

    const ref = useBlur<HTMLDivElement>(() => setOpen(false));

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
