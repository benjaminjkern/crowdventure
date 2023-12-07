import React, { useContext } from "react";
import { useRouter } from "next/router";
import { mutationCall } from "../apiUtils";
import { PaletteContext } from "../colorPalette";
import CloseButton from "../components/CloseButton";
import { UserContext } from "../user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { useStyleListener } from "../hooks";

const CrowdventureNotification = ({ notification, idx }) => {
    const { rootColor, backgroundColor } = useContext(PaletteContext);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

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
        <div
            onClick={(e) => {
                // if (e.target !== bigButtonRef.current) return;
                seeNotification().then(() => {
                    console.log(notification.link);
                    if (notification.link) router.push(notification.link);
                });
            }}
            {...useStyleListener("hover", {
                boxShadow: `0 0 6px ${rootColor[0]}`,
            })}
            style={{
                backgroundColor: backgroundColor[0],
                borderRadius: 10,
                boxShadow: `0 0 3px ${rootColor[1]}`,
                padding: 10,
                cursor: "pointer",
            }}
        >
            <div
                onClick={() => {
                    seeNotification(!notification.seen);
                }}
                {...useStyleListener("hover", {
                    backgroundColor: notification.seen
                        ? "silver"
                        : rootColor[1],
                })}
                {...useStyleListener("mousedown", {
                    backgroundColor: notification.seen
                        ? "darkgray"
                        : rootColor[0],
                })}
                style={{
                    backgroundColor: notification.seen
                        ? "lightgrey"
                        : rootColor[2],
                    color: notification.seen ? "grey" : "white",
                    borderRadius: "50%",
                    textAlign: "center",
                }}
            >
                <FontAwesomeIcon icon={faExclamation} />
            </div>

            <div>
                <span style={{}}>{notification.content}</span>

                <span
                    style={{
                        position: "absolute",
                        top: "1.5em",
                        fontSize: "0.75em",
                    }}
                >
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
    );
};

export default CrowdventureNotification;
