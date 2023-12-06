import React, { useContext, useRef } from "react";
import { PaletteContext } from "../colorPalette";
import { UserContext } from "../user";
import Link from "next/link";
import { attachStyleListener } from "../attachStyleListener";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    const ref = useRef();

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
            <span
                onClick={onClick}
                ref={ref}
                style={{
                    backgroundColor: lightColor,
                    color: backgroundColor[2],
                    width: DEFAULT_ICON_SIZE * iconScale,
                    height: DEFAULT_ICON_SIZE * iconScale,
                    borderRadius: DEFAULT_ICON_SIZE * iconScale,
                    ...commonStyle,
                }}
                {...attachStyleListener(
                    "hover",
                    {
                        backgroundColor: darkColor,
                    },
                    // Need ref because if button is inside of something else that has the event then it won't work
                    () => ref.current
                )}
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
            <span
                onClick={onClick}
                {...attachStyleListener("hover", {
                    textDecoration: isDisabled ? null : "underline",
                })}
                style={{
                    color: lightColor,
                    ...commonStyle,
                }}
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
                ...commonStyle,
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
