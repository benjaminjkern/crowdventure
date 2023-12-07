import React, { useContext } from "react";
import { mutationCall } from "../apiUtils";
import { PaletteContext } from "../colorPalette";
import CloseButton from "../components/CloseButton";
import { UserContext } from "../user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import EventListener from "../components/EventListener";

const CrowdventureNotification = ({ notification, idx }) => {
    const { rootColor, backgroundColor } = useContext(PaletteContext);
    const { user, setUser } = useContext(UserContext);

    const seeNotification = (setSeen) => {
        if (notification.seen === setSeen) return;
        const originalSeen = notification.seen;
        notification.seen = setSeen;
        setUser({
            ...user,
        });
        return mutationCall(
            "seeNotification",
            {},
            {
                accountScreenName: user.screenName,
                index: idx,
            }
        ).catch(() => {
            notification.seen = originalSeen;
            setUser({
                ...user,
            });
        });
    };

    return (
        <EventListener event="hover">
            {([hover, hoverListener]) => (
                <div
                    onClick={(e) => {
                        e.stopPropagation();

                        console.log("CLICK NOTIFICATION");
                        // if (e.target !== bigButtonRef.current) return;
                        // seeNotification().then(() => {
                        //     console.log(notification.link);
                        //     if (notification.link)
                        //         router.push(notification.link);
                        // });
                    }}
                    {...hoverListener}
                    style={{
                        backgroundColor: backgroundColor[0],
                        borderRadius: 10,
                        boxShadow: hover
                            ? `0 0 6px ${rootColor[0]}`
                            : `0 0 3px ${rootColor[1]}`,
                        padding: 10,
                        cursor: "pointer",
                        flexDirection: "row",
                    }}
                >
                    <EventListener events={["hover", "mousedown"]}>
                        {(
                            [insideHover, insideHoverListener],
                            [mousedown, mousedownListener]
                        ) => (
                            <div
                                onClick={() => {
                                    console.log("CLICK NOTIFICATION INSIDE");
                                    seeNotification(!notification.seen);
                                }}
                                {...insideHoverListener}
                                {...mousedownListener}
                                style={{
                                    backgroundColor: notification.seen
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
                                    color: notification.seen ? "grey" : "white",
                                    borderRadius: "50%",
                                    aspectRatio: 1,
                                    textAlign: "center",
                                }}
                            >
                                <FontAwesomeIcon icon={faExclamation} />
                            </div>
                        )}
                    </EventListener>

                    <div>
                        <span>{notification.content}</span>

                        <span>
                            {new Date(notification.time).toLocaleString()}
                        </span>
                    </div>

                    <CloseButton
                        onClick={() => {
                            const oldNotifs = user.notifications;

                            const newNotifs = user.notifications.filter(
                                (notif, i) => i !== idx
                            );
                            setUser({
                                ...user,
                                notifications: newNotifs,
                            });
                            mutationCall(
                                "removeNotification",
                                {},
                                {
                                    accountScreenName: user.screenName,
                                    index: idx,
                                }
                            ).catch(() => {
                                setUser({ ...user, notification: oldNotifs });
                            });
                        }}
                    />
                </div>
            )}
        </EventListener>
    );
};

export default CrowdventureNotification;
