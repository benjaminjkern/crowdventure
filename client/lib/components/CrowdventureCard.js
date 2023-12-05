import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import { PaletteContext } from "../colorPalette";
import OptionsDropdown from "./OptionsDropdown";
import TooltipWrapper from "./TooltipWrapper";
import { attachStyleListener } from "../attachStyleListener";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CrowdventureCard = ({
    href,
    picture,
    pictureUnsafe,
    dropdownOptions,
    overlayIcons,
    text,
    children,
    disabled,
}) => {
    const {
        rootColor,
        backgroundColor,
        lightBackgroundColor,
        mutedTextColor,
        textColor,
    } = useContext(PaletteContext);
    const ref = useRef();

    const BLURAMOUNT = 20;

    return (
        <div
            ref={ref}
            style={{
                textAlign: "center",
                boxShadow: `0 0 3px ${rootColor[1]}`,
                backgroundColor: backgroundColor[1],
                borderRadius: 5,
                margin: 5,
                justifyContent: "space-between",
                position: "relative",
            }}
        >
            <div style={{ overflow: "hidden", borderRadius: 5 }}>
                <Link
                    href={href}
                    {...attachStyleListener(
                        "hover",
                        {
                            boxShadow: `0 0 6px ${rootColor[0]}`,
                        },
                        () => ref.current
                    )}
                    style={{
                        color: disabled ? "grey" : null,
                        pointerEvents: disabled ? "none" : "auto",
                        justifyContent: "center",
                        flex: 1,
                    }}
                >
                    <div style={{ width: "100%" }}>
                        {picture ? (
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
                                <Image
                                    alt="Selected Picture"
                                    fill
                                    onError={(e) => {
                                        e.target.parentNode.style.display =
                                            "none";
                                    }}
                                    src={picture}
                                    style={{
                                        objectFit: "cover",
                                        // Blur bad images
                                        ...(pictureUnsafe
                                            ? {
                                                  "-webkit-filter": `blur(${BLURAMOUNT}px)`,
                                                  filter: `blur(${BLURAMOUNT}px)`,
                                              }
                                            : {}),
                                    }}
                                />
                            </div>
                        ) : null}
                        <div style={{ padding: 20, textAlign: "center" }}>
                            {text}
                        </div>
                    </div>
                </Link>

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
