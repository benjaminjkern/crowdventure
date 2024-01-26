import React, { useContext, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { PaletteContext } from "../colorPalette";
import { UserContext } from "../user";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import EventListener, { type EventListenerPair } from "./EventListener";

const DEFAULT_ICON_SIZE = 20;

export type CrowdventureButtonProps = {
    readonly children?: ReactNode;
    readonly style?: CSSProperties | ((hover: boolean) => CSSProperties);
    readonly buttonType?: "icon" | "text";
    readonly category?: "error";
    readonly requireSignedIn?: boolean;
    readonly onClick?: (e: MouseEvent) => unknown;
    readonly href?: string;
    readonly disabled?: boolean;
    readonly icon?: IconProp;
    readonly iconScale?: number;
};

const CrowdventureButton = ({
    children,
    style,
    buttonType,
    category,
    requireSignedIn,
    onClick,
    href,
    disabled: initDisabled,
    icon,
    iconScale = 1,
    ...props
}: CrowdventureButtonProps) => {
    const { user } = useContext(UserContext);
    const { rootColor, errorColor, grayColor, backgroundColor } =
        useContext(PaletteContext);

    // The value that is actually used
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const disabled = initDisabled || (requireSignedIn && !user);

    const darkColor = disabled
        ? grayColor[0]
        : category === "error"
        ? errorColor[0]
        : rootColor[0];
    const lightColor = disabled
        ? grayColor[1]
        : category === "error"
        ? errorColor[1]
        : rootColor[1];

    const commonStyle = (hover: boolean) => ({
        cursor: disabled ? "default" : "pointer",
        ...(typeof style === "function" ? style(hover) : style),
    });

    if (buttonType === "icon")
        return (
            <EventListener event="hover">
                {([hover, hoverListener]: EventListenerPair) => (
                    <span
                        onClick={(e) => {
                            if (disabled) return;
                            // @ts-ignore
                            onClick?.(e);
                        }}
                        style={{
                            backgroundColor: hover ? darkColor : lightColor,
                            color: backgroundColor[2],
                            width: DEFAULT_ICON_SIZE * iconScale,
                            height: DEFAULT_ICON_SIZE * iconScale,
                            borderRadius: DEFAULT_ICON_SIZE * iconScale,
                            ...commonStyle(hover),
                        }}
                        {...hoverListener}
                    >
                        {icon ? (
                            <FontAwesomeIcon
                                icon={icon}
                                style={{
                                    width: (DEFAULT_ICON_SIZE - 2) * iconScale,
                                    height: (DEFAULT_ICON_SIZE - 2) * iconScale,
                                    pointerEvents: "none",
                                }}
                            />
                        ) : null}
                    </span>
                )}
            </EventListener>
        );

    if (buttonType === "text")
        return (
            <EventListener event="hover">
                {([hover, hoverListener]) => (
                    <span
                        onClick={(e) => {
                            if (disabled) return;
                            // @ts-ignore
                            onClick?.(e);
                        }}
                        {...hoverListener}
                        style={{
                            color: lightColor,
                            textDecoration:
                                hover && !disabled ? "underline" : undefined,
                            ...commonStyle(hover),
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
                    disabled={disabled}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onClick={onClick}
                    style={{
                        border: `1px solid ${darkColor}`,
                        padding: 5,
                        borderRadius: 5,
                        backgroundColor: hover ? darkColor : lightColor,
                        color: "white",
                        width: "100%",
                        fontSize: DEFAULT_TEXT_SIZE,
                        ...commonStyle(hover),
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
