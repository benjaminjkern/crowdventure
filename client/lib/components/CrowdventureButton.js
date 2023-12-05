import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { UserContext } from "../user";
import Link from "next/link";
import { attachStyleListener } from "../attachStyleListener";
const CrowdventureButton = ({
    children,
    style,
    buttonType,
    category,
    requireSignedIn,
    onClick,
    href,
    disabled,
    ...props
}) => {
    const { user } = useContext(UserContext);
    const { rootColor, errorColor, grayColor } = useContext(PaletteContext);

    // The value that is actually used
    const isDisabled = disabled || (requireSignedIn && !user);

    const darkColor = isDisabled
        ? grayColor[0]
        : category === "error"
        ? errorColor[0]
        : rootColor[0];
    const lightColor = isDisabled
        ? grayColor[1]
        : category === "error"
        ? errorColor[1]
        : rootColor[1];

    if (buttonType === "text")
        return (
            <span
                onClick={onClick}
                {...attachStyleListener("hover", {
                    textDecoration: "underline",
                })}
                style={{ cursor: "pointer", color: lightColor, ...style }}
            >
                {children}
            </span>
        );

    const button = (
        <button
            disabled={isDisabled}
            onClick={onClick}
            style={{
                border: `1px solid ${darkColor}`,
                padding: 5,
                borderRadius: 5,
                backgroundColor: lightColor,
                color: "white",
                width: "100%",
                cursor: isDisabled ? null : "pointer",
                ...style,
            }}
            {...attachStyleListener("hover", {
                backgroundColor: darkColor,
            })}
            {...props}
        >
            {children}
        </button>
    );
    if (!href) return button;

    return (
        <Link href={href} style={{ textDecoration: "none", color: lightColor }}>
            {button}
        </Link>
    );
};
export default CrowdventureButton;
