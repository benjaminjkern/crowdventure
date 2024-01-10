import React, { type CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import { type PaletteType } from "../colorPalette";

const useStyles = createUseStyles<
    "notificationButtonClass",
    { seen: boolean },
    PaletteType
>(({ rootColor }) => ({
    notificationButtonClass: {
        backgroundColor: ({ seen }) => (seen ? "lightgrey" : rootColor[2]),
        "&:active": ({ seen }) => (seen ? "darkgray" : rootColor[0]),
        "&:hover": ({ seen }) => (seen ? "silver" : rootColor[1]),
        color: ({ seen }) => (seen ? "grey" : "white"),
        width: 50,
        height: 50,
        padding: 10,
        borderRadius: "50%",
        textAlign: "center",
        cursor: "pointer",
    },
}));

const NotificationButton = ({
    onClick,
    seen,
    style,
}: {
    readonly onClick: () => void;
    readonly seen: boolean;
    readonly style: CSSProperties;
}) => {
    const { notificationButtonClass } = useStyles({ seen });

    return (
        <div
            className={notificationButtonClass}
            onClick={onClick}
            style={style}
        >
            <FontAwesomeIcon icon={faExclamation} />
        </div>
    );
};

export default NotificationButton;
