import React, { useContext, useRef } from "react";
import { attachStyleListener } from "../attachStyleListener";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { PaletteContext } from "../colorPalette";

const TooltipWrapper = ({
    tooltip,
    children,
    tooltipStyle = { bottom: "100%" },
}) => {
    const ref = useRef();
    const { textColor, backgroundColor } = useContext(PaletteContext);
    return (
        <div
            style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                {...attachStyleListener(
                    "hover",
                    { opacity: 1 },
                    () => ref.current
                )}
            >
                {children}
            </div>
            <div
                ref={ref}
                style={{
                    position: "absolute",
                    textAlign: "center",
                    opacity: 0,
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
        </div>
    );
};

export default TooltipWrapper;
