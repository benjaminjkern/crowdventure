import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "+/lib/user";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import CrowdventureNotification from "+/lib/notifications/CrowdventureNotification";
import LoadingBox from "+/lib/components/LoadingBox";
import { mutationCall } from "+/lib/apiUtils";

const NotificationsPage = () => {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user === null) router.push("/");
    }, [user, router]);

    if (!user) return <LoadingBox />;

    const unseenCount = user.notifications.filter(
        (notif) => !notif.seen
    ).length;

    return (
        <div style={{ gap: 5 }}>
            <span>
                You have {unseenCount} new notification
                {unseenCount !== 1 ? "s" : ""}
                {unseenCount ? "!" : "."}
            </span>
            {user.notifications.map((notification, idx) => (
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

export const getStaticProps = () => ({
    props: {
        pageTitle: "Crowdventure - Notifications", // Ideally this would say number of notifications but I dont wanna worry about that rn
    },
});

export default NotificationsPage;
