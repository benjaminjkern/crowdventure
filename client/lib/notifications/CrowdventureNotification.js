import React, { useContext, useRef } from "react";
import { useRouter } from "next/router";
import { mutationCall } from "../apiUtils";
import { PaletteContext } from "../colorPalette";
import CloseButton from "../components/CloseButton";
import { UserContext } from "../user";

const CrowdventureNotification = ({ notification, idx }) => {
    const bigButtonRef = useRef();
    const seenButtonRef = useRef();
    const { rootColor, backgroundColor } = useContext(PaletteContext);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

    const seeNotification = async (setSeen) => {
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
            // I THINK I use the ref here justt because otherwise it tries to attach the style to the individual element that you hover over
            onClick={(e) => {
                if (e.target !== bigButtonRef.current) return;
                seeNotification().then(() => {
                    console.log(notification.link);
                    if (notification.link) router.push(notification.link);
                });
            }}
            onMouseOut={() => {
                bigButtonRef.current.style.boxShadow = `0 0 3px ${rootColor[1]}`;
            }}
            onMouseOver={() => {
                bigButtonRef.current.style.boxShadow = `0 0 6px ${rootColor[0]}`;
            }}
            ref={bigButtonRef}
            style={{
                width: "100%",
                position: "relative",
                backgroundColor: backgroundColor[0],
                height: "4em",
                borderRadius: "1em",
                boxShadow: `0 0 3px ${rootColor[1]}`,
                padding: "1em",
                cursor: "pointer",
                // No select ? lol
                userSelect: "none" /* Non-prefixed version, currently
                      supported by Chrome, Edge, Opera and Firefox */,
            }}
        >
            <div
                onClick={() => {
                    seeNotification(!notification.seen);
                }}
                onMouseDown={() => {
                    seenButtonRef.current.style.backgroundColor =
                        notification.seen ? "darkgray" : rootColor[0];
                }}
                onMouseOut={() => {
                    seenButtonRef.current.style.backgroundColor =
                        notification.seen ? "lightgrey" : rootColor[2];
                }}
                onMouseOver={() => {
                    seenButtonRef.current.style.backgroundColor =
                        notification.seen ? "silver" : rootColor[1];
                }}
                onMouseUp={() => {
                    seenButtonRef.current.style.backgroundColor =
                        notification.seen ? "silver" : rootColor[1];
                }}
                ref={seenButtonRef}
                style={{
                    width: "1.25em",
                    height: "1.25em",
                    position: "absolute",
                    left: "0.16em",
                    top: "0.16em",
                    fontSize: "2.5em",
                    lineHeight: "calc(50% + 0.8em)",
                    backgroundColor: notification.seen
                        ? "lightgrey"
                        : rootColor[2],
                    color: notification.seen ? "grey" : "white",
                    borderRadius: "50%",
                    textAlign: "center",
                }}
            >
                <span className="fa fa-exclamation">!</span>
            </div>

            <div
                style={{
                    width: "calc(100% - 4em)",
                    position: "absolute",
                    left: "4em",
                    lineHeight: "calc(50% + 1em)",
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        top: "-0.25em",
                    }}
                >
                    {notification.content}
                </span>

                <span
                    className="text-muted"
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
