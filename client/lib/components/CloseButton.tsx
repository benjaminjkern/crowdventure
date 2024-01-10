import React, { type MouseEventHandler, type CSSProperties } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    closeButtonStyle: {
        color: "#888", // TODO: Set colors
        cursor: "pointer",
        textShadow:
            "-1px 0 2px white, 0 1px 2px white, 1px 0 2px white, 0 -1px 2px white",
        "&:hover": {
            color: "#555",
        },
    },
});

const CloseButton = ({
    onClick,
    style,
}: {
    readonly onClick: MouseEventHandler;
    readonly style?: CSSProperties;
}) => {
    const { closeButtonStyle } = useStyles();
    return (
        <span className={closeButtonStyle} onClick={onClick} style={style}>
            X
        </span>
    );
};

export default CloseButton;
