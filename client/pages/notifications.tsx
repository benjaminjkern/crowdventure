import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { type GetStaticPropsResult } from "next";
import { type DefaultPageProps } from "./_app";
import { UserContext } from "+/lib/user";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import CrowdventureNotification from "+/lib/notifications/CrowdventureNotification";
import LoadingBox from "+/lib/components/LoadingBox";
import { type Notification } from "@/types/models";

type NotificationsPageProps = { readonly notifications: Notification[] };

const NotificationsPage = ({ notifications }: NotificationsPageProps) => {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user === null) router.push("/");
    }, [user, router]);

    if (!user) return <LoadingBox />;

    const unseenCount = 0; // TODO: Do this

    return (
        <div style={{ gap: 5 }}>
            <span>
                You have {unseenCount} new notification
                {unseenCount !== 1 ? "s" : ""}
                {unseenCount ? "!" : "."}
            </span>
            {notifications.map((notification, idx) => (
                <CrowdventureNotification
                    deleteNotification={() => {
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
                    idx={idx}
                    key={idx}
                    notification={notification}
                    updateNotification={(seen) => {
                        notification.seen = seen;
                        setUser({
                            ...user,
                        });
                    }}
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
