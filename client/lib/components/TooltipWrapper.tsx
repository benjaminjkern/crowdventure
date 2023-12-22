import React, { type CSSProperties, type ReactNode, useContext } from "react";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { PaletteContext } from "../colorPalette";
import EventListener from "./EventListener";

const TooltipWrapper = ({
    tooltip,
    children,
    tooltipStyle = { bottom: "100%" },
}: {
    readonly tooltip: string | ReactNode;
    readonly children: ReactNode;
    readonly tooltipStyle?: CSSProperties;
}) => {
    const { textColor, backgroundColor } = useContext(PaletteContext);
    return (
        <div
            style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <EventListener event="hover">
                {([hover, listener]) => (
                    <>
                        <div {...listener}>{children}</div>
                        <div
                            style={{
                                position: "absolute",
                                textAlign: "center",
                                opacity: hover ? 1 : 0,
                                pointerEvents: "none",
                                fontSize: DEFAULT_TEXT_SIZE * 0.8,
                                padding: 5,
                                borderRadius: 5,
                                backgroundColor: textColor,
                                color: backgroundColor[0],
                                width: 200,
                                zIndex: 2,
                                ...tooltipStyle,
                            }}
                        >
                            {tooltip}
                        </div>
                    </>
                )}
            </EventListener>
        </div>
    );
};

export default TooltipWrapper;
