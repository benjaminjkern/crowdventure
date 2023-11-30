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
            style={{
                cursor: (!requireSignedIn || user) && "pointer",
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
