import React, { type CSSProperties, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import EventListener from "../components/EventListener";
import { PaletteContext } from "../colorPalette";

const NotificationButton = ({
    onClick,
    seen,
    style,
}: {
    readonly onClick: () => void;
    readonly seen: boolean;
    readonly style: CSSProperties;
}) => {
    const { rootColor } = useContext(PaletteContext);

    return (
        <EventListener events={["hover", "mousedown"]}>
            {(
                [insideHover, insideHoverListener],
                [mousedown, mousedownListener]
            ) => (
                <div
                    onClick={onClick}
                    {...insideHoverListener}
                    {...mousedownListener}
                    style={{
                        backgroundColor: seen
                            ? mousedown // TODO: Clean this UP!!!! GROSS
                                ? "darkgray"
                                : insideHover
                                ? "silver"
                                : "lightgrey"
                            : mousedown
                            ? rootColor[0]
                            : insideHover
                            ? rootColor[1]
                            : rootColor[2],
                        color: seen ? "grey" : "white",
                        width: 50,
                        height: 50,
                        padding: 10,
                        borderRadius: "50%",
                        textAlign: "center",
                        cursor: "pointer",
                        ...style,
                    }}
                >
                    <FontAwesomeIcon icon={faExclamation} />
                </div>
            )}
        </EventListener>
    );
};

export default NotificationButton;
