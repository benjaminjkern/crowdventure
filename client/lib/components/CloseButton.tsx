import React, { type MouseEventHandler, type CSSProperties } from "react";
import styled from "styled-jss";

const CloseButtonSpan = styled("span")({
    color: "#888", // TODO: Set colors
    cursor: "pointer",
    textShadow:
        "-1px 0 2px white, 0 1px 2px white, 1px 0 2px white, 0 -1px 2px white",
    "&:hover": {
        color: "#555",
    },
});

const CloseButton = ({
    onClick,
    style,
}: {
    readonly onClick: MouseEventHandler;
    readonly style?: CSSProperties;
}) => (
    <CloseButtonSpan onClick={onClick} style={style}>
        X
    </CloseButtonSpan>
);

export default CloseButton;
