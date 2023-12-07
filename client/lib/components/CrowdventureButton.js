import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { UserContext } from "../user";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventListener from "./EventListener";

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

    if (buttonType === "icon")
        return (
            <EventListener event="hover">
                {([hover, hoverListener]) => (
                    <span
                        onClick={onClick}
                        style={{
                            backgroundColor: hover ? darkColor : lightColor,
                            color: backgroundColor[2],
                            width: DEFAULT_ICON_SIZE * iconScale,
                            height: DEFAULT_ICON_SIZE * iconScale,
                            borderRadius: DEFAULT_ICON_SIZE * iconScale,
                            ...commonStyle,
                        }}
                        {...hoverListener}
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
                )}
            </EventListener>
        );

    if (buttonType === "text")
        return (
            <EventListener event="hover">
                {([hover, hoverListener]) => (
                    <span
                        onClick={onClick}
                        {...hoverListener}
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
        <EventListener event="hover">
            {([hover, hoverListener]) => (
                <button
                    disabled={isDisabled}
                    onClick={onClick}
                    style={{
                        border: `1px solid ${darkColor}`,
                        padding: 5,
                        borderRadius: 5,
                        backgroundColor: hover ? darkColor : lightColor,
                        color: "white",
                        width: "100%",
                        ...commonStyle,
                    }}
                    {...hoverListener}
                    {...props}
                >
                    {children}
                </button>
            )}
        </EventListener>
    );
    if (!href) return button;

    return (
        <Link href={href} style={{ textDecoration: "none", color: lightColor }}>
            {button}
        </Link>
    );
};
export default CrowdventureButton;
