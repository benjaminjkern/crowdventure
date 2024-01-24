import React, { type CSSProperties, type ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { type PaletteType } from "../colorPalette";

const useStyles = createUseStyles(
    ({ textColor, backgroundColor }: PaletteType) => ({
        tooltipClass: {
            position: "absolute",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
            fontSize: DEFAULT_TEXT_SIZE * 0.8,
            padding: 5,
            borderRadius: 5,
            backgroundColor: textColor,
            color: backgroundColor[2],
            width: 200,
            zIndex: 2,
            "div:hover + &": {
                opacity: 1,
            },
        },
    })
);

const TooltipWrapper = ({
    tooltip,
    children,
    tooltipStyle = { bottom: "100%" },
}: {
    readonly tooltip: string | ReactNode;
    readonly children: ReactNode;
    readonly tooltipStyle?: CSSProperties;
}) => {
    const { tooltipClass } = useStyles();
    return (
        <div
            style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div>{children}</div>
            <div className={tooltipClass} style={tooltipStyle}>
                {tooltip}
            </div>
        </div>
    );
};

export default TooltipWrapper;
