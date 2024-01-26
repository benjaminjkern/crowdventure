import React, {
    type Dispatch,
    type SetStateAction,
    useContext,
    useState,
} from "react";
import Link from "next/link";
import { createUseStyles } from "react-jss";
import { PaletteContext, type PaletteType } from "../colorPalette";
import CloseButton from "../components/CloseButton";
import { UserContext } from "../user";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { useDebounce } from "../hooks";
import NotificationButton from "./NotificationButton";
import { type Notification } from "@/types/models";

const useStyles = createUseStyles(
    ({ backgroundColor, rootColor }: PaletteType) => ({
        notificationClass: {
            backgroundColor: backgroundColor[0],
            borderRadius: 10,
            boxShadow: `0 0 3px ${rootColor[1]}`,
            padding: 10,
            gap: 10,
            cursor: "pointer",
            flexDirection: "column",
            paddingLeft: 70, // Make space for buttons
            paddingRight: 30,
            justifyContent: "space-between",
            alignItems: "flex-start",
            minHeight: 70,
            "&:hover": {
                boxShadow: `0 0 6px ${rootColor[0]}`,
            },
        },
    })
);

const CrowdventureNotification = ({
    notification,
    setNotifications,
}: {
    readonly notification: Notification;
    readonly setNotifications: Dispatch<SetStateAction<Notification[]>>;
}) => {
    const { rootColor, backgroundColor, mutedTextColor } =
        useContext(PaletteContext);
    const { user } = useContext(UserContext);

    const [seen, setSeen] = useState(notification.seen);

    const sendSeeNotificationRequest = useDebounce((newSeen) => {
        if (newSeen === notification.seen) return;
        const originalSeen = notification.seen;
        // const response = apiClient.provide("post")
        // mutationCall(
        //     "seeNotification",
        //     {},
        //     {
        //         accountScreenName: user.screenName,
        //         index: idx,
        //     }
        // )
        //     .then(() => {
        //         updateNotification(newSeen);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         updateNotification(originalSeen);
        //         setSeen(originalSeen);
        //     });
    });

    const seeNotification = (newSeen: boolean) => {
        setSeen(newSeen);
        sendSeeNotificationRequest(newSeen);
    };

    const deleteNotification = () => {};

    const { notificationClass } = useStyles();

    return (
        <div style={{ position: "relative" }}>
            <Link
                className={notificationClass}
                href={notification.link || "#"}
                onClick={() => seeNotification(true)}
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
                    {new Date(notification.createdAt).toLocaleString()}
                </span>
            </Link>
            {/* These are hovering over the link so that they don't interfere with it with styles or events*/}
            <NotificationButton
                onClick={() => seeNotification(!seen)}
                seen={seen}
                style={{ position: "absolute", left: 10, top: 10 }}
            />
            <CloseButton
                onClick={() => deleteNotification()}
                style={{ position: "absolute", right: 10, top: 10 }}
            />
        </div>
    );
};

export default CrowdventureNotification;
