import React, { type CSSProperties, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
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
import { useMediaQuery } from "../hooks";
// import UnsafeModal from "./Modals/UnsafeModal";

const AccountManager = ({
    wrapperStyle,
    vertical: initVertical = false,
}: {
    readonly wrapperStyle?: CSSProperties;
    readonly vertical?: boolean;
}) => {
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const { unsafeMode, setUnsafeMode } = useContext(UnsafeModeContext);
    const { mutedTextColor, textColor } = useContext(PaletteContext);

    const isSmall = useMediaQuery("(max-width: 440px)");
    const vertical = isSmall || initVertical;

    if (!user)
        return (
            <div
                style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginInline: vertical ? 20 : 0,
                    flexDirection: vertical ? "column" : "row",
                    flexWrap: "wrap",
                }}
            >
                You are not logged in.
                <span style={{ marginInline: 5, gap: 5 }}>
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

    const unseenNotifications = 0; // TODO: Do this

    return (
        <div
            style={{
                alignItems: vertical ? "flex-end" : "center",
                flexDirection: vertical ? "column" : "row",
                justifyContent: vertical ? undefined : "space-between",
                ...wrapperStyle,
            }}
        >
            <AccountPreview
                account={user}
                badgeNumber={unseenNotifications}
                imgSide="right"
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
                    tooltipStyle={{ top: "calc(100% + 5px)", right: 0 }}
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
