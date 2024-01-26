import React, { type Dispatch, type SetStateAction, useContext } from "react";

import PictureModal from "../components/PictureModal";
import { ModalContext } from "../modal";
import { UserContext } from "../user";
import CrowdventureButton from "../components/CrowdventureButton";
import ParagraphText from "../components/ParagraphText";
import { useMediaQuery } from "../hooks";
import EditAccountModal from "./EditAccountModal";
import AccountPreview from "./AccountPreview";
import { type Account } from "@/types/models";

const AccountHeader = ({
    account,
    setAccount,
}: {
    readonly account: Account;
    readonly setAccount: Dispatch<SetStateAction<Account>>;
}) => {
    const { openModal } = useContext(ModalContext);
    const isMobile = useMediaQuery("(max-width: 800px)");

    const { user, setUser } = useContext(UserContext);
    const loggedInAsThisUser = user?.screenName === account.screenName;
    const unseenNotifications = 0;

    const buttonsHorizontal = useMediaQuery(
        "(min-width: 425px) and (max-width: 800px)"
    );
    return (
        <div style={{ flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ flex: 3, gap: 10 }}>
                <AccountPreview
                    account={account}
                    onClickImage={() => {
                        openModal(
                            <PictureModal
                                fallbackImage={require("../../public/defaultProfilePic.jpg")}
                                pictureURL={
                                    account.profilePicURL ??
                                    require("../../public/defaultProfilePic.jpg")
                                }
                                title={account.screenName}
                            />
                        );
                    }}
                    scale={3}
                />

                <ParagraphText text={account.bio} />
            </div>
            <div
                style={{
                    flex: 1,
                    gap: 5,
                    flexDirection: buttonsHorizontal ? "row" : "column",
                    marginTop: isMobile ? 20 : 0,
                }}
            >
                {loggedInAsThisUser ? (
                    <div style={{ flex: 1 }}>
                        <CrowdventureButton
                            href="/notifications"
                            onClick={() => 5}
                        >
                            Notifications{" "}
                            {unseenNotifications ? (
                                <span style={{ color: "red" }}>
                                    ({unseenNotifications} New)
                                </span>
                            ) : null}
                        </CrowdventureButton>
                    </div>
                ) : null}
                {loggedInAsThisUser || user?.isAdmin ? (
                    <div style={{ flex: 1 }}>
                        <CrowdventureButton
                            onClick={() => {
                                openModal(
                                    <EditAccountModal
                                        account={account}
                                        setAccount={setAccount}
                                    />
                                );
                            }}
                        >
                            Edit Account
                        </CrowdventureButton>
                    </div>
                ) : null}

                {loggedInAsThisUser ? (
                    <div style={{ flex: 1 }}>
                        <CrowdventureButton
                            category="error"
                            onClick={() => {
                                setUser();
                            }}
                        >
                            Log out
                        </CrowdventureButton>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AccountHeader;
