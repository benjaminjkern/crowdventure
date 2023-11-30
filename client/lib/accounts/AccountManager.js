import React, { useContext, useState } from "react";
import CrowdventureButton from "../components/CrowdventureButton";
import CrowdventureSwitch from "../components/CrowdventureSwitch";
import TooltipWrapper from "../components/TooltipWrapper";
import AccountPreview from "./AccountPreview";

import LoginModal from "./LoginModal";
import { ModalContext } from "../modal";
import { UserContext } from "../user";
import { UnsafeModeContext } from "../unsafeMode";
import SignUpModal from "./SignUpModal";
import { PaletteContext } from "../colorPalette";
// import UnsafeModal from "./Modals/UnsafeModal";

const AccountManager = ({ wrapperStyle }) => {
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const { unsafeMode, setUnsafeMode } = useContext(UnsafeModeContext);
    const { borderColor } = useContext(PaletteContext);

    if (!user)
        return (
            <div style={{ alignItems: "center", marginInline: 20 }}>
                You are not logged in.{" "}
                <div style={{ flexDirection: "row" }}>
                    <CrowdventureButton
                        buttonType="text"
                        onClick={() => {
                            openModal(<LoginModal />);
                        }}
                    >
                        Log In
                    </CrowdventureButton>
                    <span style={{ marginInline: 5 }}>or</span>
                    <CrowdventureButton
                        buttonType="text"
                        onClick={() => {
                            openModal(<SignUpModal />);
                        }}
                    >
                        Sign Up
                    </CrowdventureButton>
                </div>
            </div>
        );

    const seenNotifications = user.notifications.filter(
        (notif) => !notif.seen
    ).length;

    return (
        <div style={{ alignItems: "flex-end", ...wrapperStyle }}>
            <AccountPreview
                account={user}
                imgSide="right"
                overlay={
                    seenNotifications > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                right: "1.5em",
                                top: "-0.5em",
                                borderRadius: "1em",
                                backgroundColor: "red",
                                width: "2em",
                                height: "2em",
                                lineHeight: "2em",
                                fontSize: "0.5em",
                                color: "white",
                            }}
                        >
                            {seenNotifications}
                        </div>
                    )
                }
                scale={1.5}
            />
            <div style={{ flexDirection: "row", marginTop: 5 }}>
                <span style={{ color: borderColor, marginRight: 5 }}>
                    Unsafe Mode:
                </span>
                <CrowdventureSwitch
                    onChange={(checked) => {
                        setUnsafeMode(checked);
                        if (checked) {
                            // showModal(
                            //     <UnsafeModal
                            //         close={() => showModal(undefined)}
                            //         loggedInAs={loggedInAs}
                            //         onConfirm={() => {
                            //             new Cookies().set("unsafeMode", true, {
                            //                 path: "/",
                            //             });
                            //             setLoggedInAs({
                            //                 ...loggedInAs,
                            //                 unsafeMode: true,
                            //             });
                            //             showModal(undefined);
                            //         }}
                            //     />
                            // );
                        } else {
                            // new Cookies().set("unsafeMode", false, {
                            //     path: "/",
                            // });
                        }
                    }}
                    value={unsafeMode}
                />
                <TooltipWrapper tooltip="Unsafe mode allows you to see all content on Crowdventure, including content that has been flagged as unsafe for the general public!">
                    {/* <span className="fa fa-info-circle" /> */}
                </TooltipWrapper>
            </div>
        </div>
    );
};

export default AccountManager;
