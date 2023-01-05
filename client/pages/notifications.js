import React, { useState, useEffect, createRef, useContext } from "react";
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
    }, [user]);

    if (!user) return <LoadingBox />;

    const unseen = user.notifications.filter((notif) => !notif.seen);

    return (
        <div style={{ marginBottom: "3em" }}>
            <span>
                You have {unseen.length} new notification
                {unseen.length !== 1 ? "s" : ""}
                {unseen.length ? "!" : "."}
            </span>
            <p />
            {user.notifications.map((notification, idx) => {
                return (
                    <CrowdventureNotification
                        notification={notification}
                        key={idx}
                        idx={idx}
                    />
                );
            })}

            <CrowdventureButton
                className="float-right"
                onClick={() => {
                    router.push(`/account/${user.screenName}`);
                }}
            >
                Back to account &gt;
            </CrowdventureButton>
        </div>
    );
};

export const getStaticProps = () => {
    return {
        props: {
            pageTitle: "Crowdventure - Notifications", // Ideally this would say number of notifications but I dont wanna worry about that rn
        },
    };
};

export default NotificationsPage;
