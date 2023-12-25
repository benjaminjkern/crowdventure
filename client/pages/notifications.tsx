import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import { type GetStaticPropsResult } from "next";
import { type DefaultPageProps } from "./_app";
import { UserContext } from "+/lib/user";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import CrowdventureNotification from "+/lib/notifications/CrowdventureNotification";
import LoadingBox from "+/lib/components/LoadingBox";
import { type Notification } from "@/types/models";

type NotificationsPageProps = { readonly notifications: Notification[] };

const NotificationsPage = ({
    notifications: initNotifications,
}: NotificationsPageProps) => {
    const router = useRouter();
    const { user } = useContext(UserContext);

    const [notifications, setNotifications] = useState(initNotifications);

    useEffect(() => {
        if (user === null) router.push("/");
    }, [user, router]);

    if (!user) return <LoadingBox />;

    const unseenCount = notifications.filter(({ seen }) => seen).length;

    return (
        <div style={{ gap: 5 }}>
            <span>
                You have {unseenCount} new notification
                {unseenCount !== 1 ? "s" : ""}
                {unseenCount ? "!" : "."}
            </span>
            {notifications.map((notification, idx) => (
                <CrowdventureNotification
                    key={idx}
                    notification={notification}
                    setNotifications={setNotifications}
                />
            ))}

            <CrowdventureButton href={`/account/${user.screenName}`}>
                Back to account &gt;
            </CrowdventureButton>
        </div>
    );
};

export const getStaticProps = async (): Promise<
    GetStaticPropsResult<DefaultPageProps & NotificationsPageProps>
    // eslint-disable-next-line require-await
> => {
    const notifications: Notification[] = []; // TODO: Do this
    return {
        props: {
            notifications,
            pageTitle: "Crowdventure - Notifications", // Ideally this would say number of notifications but I dont wanna worry about that rn
        },
    };
};

export default NotificationsPage;
