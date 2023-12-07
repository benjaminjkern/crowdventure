import React, { useContext } from "react";
import { mutationCall } from "../apiUtils";
import { PaletteContext } from "../colorPalette";
import CloseButton from "../components/CloseButton";
import { UserContext } from "../user";
import EventListener from "../components/EventListener";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import Link from "next/link";
import NotificationButton from "./NotificationButton";

const CrowdventureNotification = ({ notification, idx }) => {
    const { rootColor, backgroundColor, mutedTextColor } =
        useContext(PaletteContext);
    const { user, setUser } = useContext(UserContext);

    const seeNotification = (setSeen) => {
        if (notification.seen === setSeen) return;

        const originalSeen = notification.seen;
        notification.seen = setSeen;
        setUser({
            ...user,
        });
        mutationCall(
            "seeNotification",
            {},
            {
                accountScreenName: user.screenName,
                index: idx,
            }
        ).catch((error) => {
            console.error(error);
            notification.seen = originalSeen;
            setUser({
                ...user,
            });
        });
    };

    return (
        <div style={{ position: "relative" }}>
            <EventListener event="hover">
                {([hover, hoverListener]) => (
                    <Link
                        href={notification.link || "#"}
                        onClick={() => seeNotification(true)}
                        {...hoverListener}
                        style={{
                            backgroundColor: backgroundColor[0],
                            borderRadius: 10,
                            boxShadow: hover
                                ? `0 0 6px ${rootColor[0]}`
                                : `0 0 3px ${rootColor[1]}`,
                            padding: 10,
                            gap: 10,
                            cursor: "pointer",
                            flexDirection: "column",
                            paddingLeft: 70, // Make space for buttons
                            paddingRight: 30,
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            minHeight: 70,
                        }}
                    >
                        <span style={{ justifyContent: "flex-start" }}>
                            {notification.content}
                        </span>

                        <span
                            style={{
                                justifyContent: "flex-start",
                                fontSize: DEFAULT_TEXT_SIZE * 0.8,
                                color: mutedTextColor,
                            }}
                        >
                            {new Date(notification.time).toLocaleString()}
                        </span>
                    </Link>
                )}
            </EventListener>
            <NotificationButton
                onClick={() => seeNotification(!notification.seen)}
                seen={notification.seen}
                style={{ position: "absolute", left: 10, top: 10 }}
            />
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
                        setUser({
                            ...user,
                            notification: oldNotifs,
                        });
                    });
                }}
                style={{ position: "absolute", right: 10, top: 10 }}
            />
        </div>
    );
};

export default CrowdventureNotification;
