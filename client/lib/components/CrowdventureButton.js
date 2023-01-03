import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { UserContext } from "../user";
const CrowdventureButton = ({
    children,
    style,
    buttonType,
    requireSignedIn,
    onClick,
    ...props
}) => {
    const { user } = useContext(UserContext);
    const { rootColor } = useContext(PaletteContext);

    if (buttonType === "text")
        return (
            <span
                onClick={onClick}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                    e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                    e.target.style.textDecoration = "none";
                }}
            >
                {children}
            </span>
        );

    return (
        <button
            style={{
                border: `1px solid ${rootColor[0]}`,
                backgroundColor: rootColor[1],
                cursor: requireSignedIn && !user && "pointer",
                ...style,
            }}
            disabled={requireSignedIn && !user}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = rootColor[0];
                // Do overlay
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = rootColor[1];
            }}
            {...props}
        >
            {children}
        </button>
    );
};
export default CrowdventureButton;
