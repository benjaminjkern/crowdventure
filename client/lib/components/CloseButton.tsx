import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { type MouseEventHandler, type CSSProperties } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    closeButtonStyle: {
        color: "#888", // TODO: Set colors
        cursor: "pointer",
        width: 15,
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
        <FontAwesomeIcon
            className={closeButtonStyle}
            icon={faClose}
            onClick={onClick}
            style={style}
        />
    );
};

export default CloseButton;
