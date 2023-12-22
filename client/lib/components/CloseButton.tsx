import React, { type MouseEventHandler, type CSSProperties } from "react";
import EventListener from "./EventListener";

const CloseButton = ({
    onClick,
    style,
}: {
    readonly onClick: MouseEventHandler;
    readonly style?: CSSProperties;
}) => (
    <EventListener event="hover">
        {([hover, listener]) => (
            <span
                onClick={onClick}
                {...listener}
                style={{
                    color: hover ? "#555" : "#888", // TODO: Set colors
                    cursor: "pointer",
                    textShadow:
                        "-1px 0 2px white, 0 1px 2px white, 1px 0 2px white, 0 -1px 2px white",
                    ...style,
                }}
            >
                X
            </span>
        )}
    </EventListener>
);

export default CloseButton;
