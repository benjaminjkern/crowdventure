import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { UserContext } from "../user";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyleListener } from "../hooks";

const DEFAULT_ICON_SIZE = 20;

const CrowdventureButton = ({
    children,
    style,
    buttonType,
    category,
    requireSignedIn,
    onClick,
    href,
    disabled,
    icon,
    iconScale = 1,
    ...props
}) => {
    const { user } = useContext(UserContext);
    const { rootColor, errorColor, grayColor, backgroundColor } =
        useContext(PaletteContext);

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

    const commonStyle = {
        cursor: isDisabled ? "default" : "pointer",
        ...style,
    };

    const backgroundHoverListener = useStyleListener("hover", {
        backgroundColor: darkColor,
    });

    if (buttonType === "icon")
        return (
            <span
                onClick={onClick}
                style={{
                    backgroundColor: lightColor,
                    color: backgroundColor[2],
                    width: DEFAULT_ICON_SIZE * iconScale,
                    height: DEFAULT_ICON_SIZE * iconScale,
                    borderRadius: DEFAULT_ICON_SIZE * iconScale,
                    ...commonStyle,
                }}
                {...backgroundHoverListener}
            >
                <FontAwesomeIcon
                    icon={icon}
                    style={{
                        width: (DEFAULT_ICON_SIZE - 2) * iconScale,
                        height: (DEFAULT_ICON_SIZE - 2) * iconScale,
                        pointerEvents: "none",
                    }}
                />
            </span>
        );

    if (buttonType === "text")
        return (
            <EventListener eventType="hover">
                {(hover, elementRef) => (
                    <span
                        onClick={onClick}
                        ref={elementRef}
                        style={{
                            color: lightColor,
                            textDecoration:
                                hover && !isDisabled ? "underline" : null,
                            ...commonStyle,
                        }}
                    >
                        {children}
                    </span>
                )}
            </EventListener>
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
                ...commonStyle,
            }}
            {...backgroundHoverListener}
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
