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
import { createUseStyles } from "react-jss";
import { PaletteContext, type PaletteType } from "../colorPalette";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { blurImageStyle } from "../styles";
import OptionsDropdown, { type DropDownOption } from "./OptionsDropdown";
import TooltipWrapper from "./TooltipWrapper";

const useStyles = createUseStyles(
    ({ rootColor, backgroundColor }: PaletteType) => ({
        card: {
            textAlign: "center",
            boxShadow: `0 0 3px ${rootColor[1]}`,
            backgroundColor: backgroundColor[1],
            borderRadius: "5px",
            margin: "5px",
            justifyContent: "space-between",
            position: "relative",
            "& div a:hover": {
                "&": {
                    boxShadow: `0 0 6px ${rootColor[0]}`,
                },
            },
        },
    })
);

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
    const { lightBackgroundColor, mutedTextColor } = useContext(PaletteContext);

    const { card } = useStyles();

    const [showImage, setShowImage] = useState(true);

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

    return (
        <div className={card}>
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
                                        padding: "1px",
                                        position: "relative",
                                        aspectRatio: 16 / 9,
                                    }}
                                >
                                    {cardImage}
                                </div>
                            ) : null}
                            <div
                                style={{
                                    padding: 20,
                                    textAlign: "center",
                                }}
                            >
                                {text}
                            </div>
                        </div>
                    );
                    if (href && !disabled)
                        return (
                            <Link href={href} style={style}>
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
                                <TooltipWrapper key={i} tooltip={tooltip}>
                                    <FontAwesomeIcon
                                        color={iconColor}
                                        icon={icon}
                                        style={{
                                            width: 15,
                                            height: 15,
                                            filter: `drop-shadow(0 0 1px black)`,
                                        }}
                                    />
                                </TooltipWrapper>
                            )
                    )}
                </div>
                <div style={{ position: "absolute", top: 5, right: 5 }}>
                    <OptionsDropdown dropdownOptions={dropdownOptions} />
                </div>

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
    );
};
export default CrowdventureCard;
