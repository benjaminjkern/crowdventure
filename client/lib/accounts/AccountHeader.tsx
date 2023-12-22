import React, { type Dispatch, type SetStateAction, useContext } from "react";

import PictureModal from "../components/PictureModal";
import { ModalContext } from "../modal";
import { UserContext } from "../user";
import CrowdventureButton from "../components/CrowdventureButton";
import ParagraphText from "../components/ParagraphText";
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

    const { user, setUser } = useContext(UserContext);
    const loggedInAsThisUser = user?.screenName === account.screenName;
    const unseenNotifications = 0;
    return (
        <div style={{ flexDirection: "row" }}>
            <div style={{ flex: 3, gap: 10 }}>
                <AccountPreview
                    account={account}
                    onClickImage={() => {
                        openModal(
                            <PictureModal
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
            <div style={{ flex: 1, gap: 5 }}>
                {loggedInAsThisUser ? (
                    <CrowdventureButton href="/notifications" onClick={() => 5}>
                        Notifications{" "}
                        {unseenNotifications ? (
                            <span style={{ color: "red" }}>
                                ({unseenNotifications} New)
                            </span>
                        ) : null}
                    </CrowdventureButton>
                ) : null}
                {loggedInAsThisUser || user?.isAdmin ? (
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
                ) : null}

                {loggedInAsThisUser ? (
                    <CrowdventureButton
                        category="error"
                        onClick={() => {
                            setUser();
                        }}
                    >
                        Log out
                    </CrowdventureButton>
                ) : null}
            </div>
        </div>
    );
};

export default AccountHeader;
