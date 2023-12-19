import React, { type CSSProperties, useContext } from "react";
import { UserContext } from "../user";
import { ModalContext } from "../modal";
import { UnsafeModeContext } from "../unsafeMode";
import { PaletteContext } from "../colorPalette";
import CrowdventureButton from "../components/CrowdventureButton";
import LoginModal from "../accounts/LoginModal";
import SignUpModal from "../accounts/SignUpModal";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureSwitch from "../components/CrowdventureSwitch";
import TooltipWrapper from "../components/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import UnsafeModal from "./Modals/UnsafeModal";

const AccountManager = ({ wrapperStyle }: { wrapperStyle: CSSProperties }) => {
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const { unsafeMode, setUnsafeMode } = useContext(UnsafeModeContext);
    const { mutedTextColor, textColor } = useContext(PaletteContext);

    if (!user)
        return (
            <div style={{ alignItems: "center", marginInline: 20 }}>
                You are not logged in.
                <span style={{ gap: 5 }}>
                    <CrowdventureButton
                        buttonType="text"
                        onClick={() => {
                            openModal(<LoginModal />);
                        }}
                    >
                        Log In
                    </CrowdventureButton>
                    or
                    <CrowdventureButton
                        buttonType="text"
                        onClick={() => {
                            openModal(<SignUpModal />);
                        }}
                    >
                        Sign Up
                    </CrowdventureButton>
                </span>
            </div>
        );

    return (
        <div style={{ alignItems: "flex-end", ...wrapperStyle }}>
            <AccountPreview
                account={user}
                imgSide="right"
                overlay={
                    unseenNotifications > 0 && (
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
                            {unseenNotifications}
                        </div>
                    )
                }
                scale={1.5}
                style={{ color: textColor }}
            />
            <div style={{ flexDirection: "row", marginTop: 5, gap: 5 }}>
                <span style={{ color: mutedTextColor }}>Unsafe Mode:</span>
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
                <TooltipWrapper
                    tooltip={
                        <span>
                            Unsafe mode allows you to see all content on
                            Crowdventure, including content that has been
                            flagged as unsafe for the general public!
                        </span>
                    }
                    tooltipStyle={{ top: "100%" }}
                >
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                        style={{ width: 15, height: 15 }}
                    />
                </TooltipWrapper>
            </div>
        </div>
    );
};

export default AccountManager;
