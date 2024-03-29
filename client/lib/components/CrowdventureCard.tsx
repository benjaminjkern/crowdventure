import Image from "next/image";
import Link from "next/link";
import React, {
    type ReactNode,
    useContext,
    useState,
    type CSSProperties,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { PaletteContext } from "../colorPalette";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { blurImageStyle, nonSelectableTextStyle } from "../styles";
import { useMediaQuery } from "../hooks";
import OptionsDropdown, { type DropDownOption } from "./OptionsDropdown";
import TooltipWrapper from "./TooltipWrapper";
import EventListener from "./EventListener";

type OverlayIcon = {
    active: boolean;
    tooltip: string | ReactNode;
    icon: IconProp;
    iconColor: string;
};

const CrowdventureCard = ({
    href,
    picture,
    pictureUnsafe,
    dropdownOptions,
    overlayIcons,
    text,
    children,
    disabled,
    onImageError = () => {},
}: {
    readonly href?: string;
    readonly picture?: string;
    readonly pictureUnsafe?: boolean;
    readonly dropdownOptions: DropDownOption[];
    readonly overlayIcons: OverlayIcon[];
    readonly text: string;
    readonly children: ReactNode;
    readonly disabled?: boolean;
    readonly onImageError?: () => void;
}) => {
    const { rootColor, backgroundColor, lightBackgroundColor, mutedTextColor } =
        useContext(PaletteContext);

    const [showImage, setShowImage] = useState(true);

    const isMobile = useMediaQuery("(max-device-width: 800px)");

    const cardImage = picture ? (
        <Image
            alt="Something went wrong!"
            fill
            onError={() => {
                setShowImage(false);
                onImageError();
            }}
            src={picture}
            style={{
                objectFit: "cover",
                // Blur bad images
                ...blurImageStyle(pictureUnsafe ?? false),
            }}
        />
    ) : null;

    // Needed to keep event listener because I wanted to style the parent component if hovering over a
    // specific child element and didn't want to do weird pointer-disabling stuff
    return (
        <EventListener event="hover">
            {([hover, listener]) => (
                <div
                    style={{
                        textAlign: "center",
                        boxShadow: hover
                            ? `0 0 6px ${rootColor[0]}`
                            : `0 0 3px ${rootColor[1]}`,
                        backgroundColor: backgroundColor[1],
                        borderRadius: 5,
                        margin: 5,
                        justifyContent: "space-between",
                        position: "relative",
                    }}
                >
                    <div style={{ overflow: "hidden", borderRadius: 5 }}>
                        {(() => {
                            const style: CSSProperties = {
                                color: disabled ? "grey" : undefined,
                                pointerEvents: disabled ? "none" : "auto",
                                justifyContent: "center",
                                flex: 1,
                            };
                            const inside = (
                                <div style={{ width: "100%" }}>
                                    {picture && showImage ? (
                                        <div
                                            style={{
                                                backgroundColor: "white",
                                                // loggedInAs && loggedInAs.unsafeMode
                                                //     ? palette[5]
                                                //     : "white",
                                                padding: 1,
                                                position: "relative",
                                                aspectRatio: 16 / 9,
                                            }}
                                        >
                                            {cardImage}
                                        </div>
                                    ) : null}
                                    <div
                                        style={{
                                            padding: isMobile ? 40 : 20,
                                            textAlign: "center",
                                        }}
                                    >
                                        {text}
                                    </div>
                                </div>
                            );
                            if (href && !disabled)
                                return (
                                    <Link
                                        href={href}
                                        {...listener}
                                        style={style}
                                    >
                                        {inside}
                                    </Link>
                                );

                            return <span style={style}>{inside}</span>;
                        })()}

                        <div
                            style={{
                                position: "absolute",
                                top: 5,
                                left: 5,
                                flexDirection: "row",
                                gap: 5,
                            }}
                        >
                            {overlayIcons.map(
                                ({ active, tooltip, icon, iconColor }, i) =>
                                    active && (
                                        <TooltipWrapper
                                            key={i}
                                            tooltip={tooltip}
                                            tooltipStyle={{
                                                left: "calc(100% + 5px)",
                                                top: 0,
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                color={iconColor}
                                                icon={icon}
                                                style={{
                                                    ...nonSelectableTextStyle,
                                                    width: isMobile ? 30 : 15,
                                                    height: isMobile ? 30 : 15,
                                                    filter: `drop-shadow(0 0 1px black)`,
                                                }}
                                            />
                                        </TooltipWrapper>
                                    )
                            )}
                        </div>
                        {dropdownOptions.some((option) => !option.disabled) ? (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                }}
                            >
                                <OptionsDropdown
                                    dropdownOptions={dropdownOptions}
                                />
                            </div>
                        ) : null}

                        <div
                            style={{
                                backgroundColor: lightBackgroundColor,
                                color: mutedTextColor,
                                textAlign: "center",
                                fontSize: (DEFAULT_TEXT_SIZE * 3) / 4,
                                padding: 10,
                            }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </EventListener>
    );
};
export default CrowdventureCard;
