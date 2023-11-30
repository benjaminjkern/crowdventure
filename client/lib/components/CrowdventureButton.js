import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { UserContext } from "../user";
import Link from "next/link";
const CrowdventureButton = ({
    children,
    style,
    buttonType,
    requireSignedIn,
    onClick,
    href,
    ...props
}) => {
    const { user } = useContext(UserContext);
    const { rootColor } = useContext(PaletteContext);

    if (buttonType === "text")
        return (
            <span
                aria-hidden="true"
                onClick={onClick}
                onMouseEnter={(e) => {
                    e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                    e.target.style.textDecoration = "none";
                }}
                style={{ cursor: "pointer", color: rootColor[1], ...style }}
            >
                {children}
            </span>
        );

    const button = (
        <button
            disabled={requireSignedIn ? !user : null}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = rootColor[0];
                // Do overlay
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = rootColor[1];
            }}
            style={{
                border: `1px solid ${rootColor[0]}`,
                padding: 5,
                borderRadius: 5,
                backgroundColor: rootColor[1],
                color: "white",
                cursor: (!requireSignedIn || user) && "pointer",
                width: "100%",
                ...style,
            }}
            {...props}
        >
            {children}
        </button>
    );
    if (!href) return button;

    return (
        <Link href={href} style={{ textDecoration: "none" }}>
            {button}
        </Link>
    );
};
export default CrowdventureButton;
