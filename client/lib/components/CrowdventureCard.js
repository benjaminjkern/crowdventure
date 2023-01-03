import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import { PaletteContext } from "../colorPalette";
import OptionsDropdown from "./OptionsDropdown";
import TooltipWrapper from "./TooltipWrapper";

const CrowdventureCard = ({
    href,
    picture,
    pictureUnsafe,
    dropdownOptions,
    overlayIcons,
    text,
    children,
}) => {
    const { rootColor, backgroundColor } = useContext(PaletteContext);
    const ref = useRef();

    const BLURAMOUNT = 20;

    return (
        <div
            style={{
                width: 200,
                boxShadow: `0 0 3px ${rootColor[1]}`,
                overflow: "hidden",
                backgroundColor: backgroundColor[1],
            }}
            ref={ref}
        >
            <Link
                href={href}
                style={{ color: rootColor[1] }}
                onMouseEnter={() => {
                    ref.current.style.boxShadow = `0 0 6px ${rootColor[0]}`;
                }}
                onMouseLeave={() => {
                    ref.current.style.boxShadow = `0 0 3px ${rootColor[1]}`;
                }}
            >
                <a>
                    {picture && (
                        <div
                            style={{
                                backgroundColor: "white",
                                // loggedInAs && loggedInAs.unsafeMode
                                //     ? palette[5]
                                //     : "white",
                                padding: "1px",
                            }}
                        >
                            <Image
                                height={200}
                                width={200}
                                src={picture}
                                style={{
                                    maxHeight: "30vh",
                                    objectFit: "cover",
                                    // Blur bad images
                                    ...(pictureUnsafe
                                        ? {
                                              "-webkit-filter":
                                                  "blur(" + BLURAMOUNT + "px)",
                                              filter:
                                                  "blur(" + BLURAMOUNT + "px)",
                                          }
                                        : {}),
                                }}
                                onError={(e) => {
                                    e.target.parentNode.style.display = "none";
                                }}
                            />
                        </div>
                    )}
                    <div style={{ paddingTop: "2em", textAlign: "center" }}>
                        {text}
                    </div>
                </a>
            </Link>

            {overlayIcons.map(
                ({ active, tooltip, icon, iconColor }, i) =>
                    active && (
                        <TooltipWrapper tooltip={tooltip} key={i}>
                            {iconColor} {icon}
                            {/* <div
                    style={{
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                        color: "yellow",
                        "-webkit-touch-callout": "none",
                        "-webkit-user-select": "none",
                        "-khtml-user-select": "none",
                        "-moz-user-select": "none",
                        "-ms-user-select": "none",
                        "user-select": "none",
                        "text-shadow": "0 0 1px black",
                    }}
                    className="fa"
                >
                    &#xf005;
                </div> */}
                        </TooltipWrapper>
                    )
            )}

            <OptionsDropdown dropdownOptions={dropdownOptions} />

            <div
                style={{
                    backgroundColor: backgroundColor,
                    color: "gray",
                    textAlign: "center",
                    fontSize: 10,
                }}
            >
                {children}
            </div>
        </div>
    );
};
export default CrowdventureCard;
