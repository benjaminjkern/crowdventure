import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../lib/user";
import CrowdventureButton from "../lib/components/CrowdventureButton";
import CrowdventureNotification from "../lib/notifications/CrowdventureNotification";
import LoadingBox from "../lib/components/LoadingBox";

const NotificationsPage = () => {
    const router = useRouter();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user === null) router.push("/");
    }, [user, router]);

    if (!user) return <LoadingBox />;

    const unseen = user.notifications.filter((notif) => !notif.seen);

    return (
        <div style={{ gap: 5 }}>
            <span>
                You have {unseen.length} new notification
                {unseen.length !== 1 ? "s" : ""}
                {unseen.length ? "!" : "."}
            </span>
            {user.notifications.map((notification, idx) => (
                <CrowdventureNotification
                    idx={idx}
                    key={idx}
                    notification={notification}
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
