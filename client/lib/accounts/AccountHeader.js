import React, { useContext } from "react";
import AccountPreview from "./AccountPreview";
import PictureModal from "../components/PictureModal";
import { ModalContext } from "../modal";
import { UserContext } from "../user";
import CrowdventureButton from "../components/CrowdventureButton";
import MessageModal from "./MessageModal";
import EditAccountModal from "./EditAccountModal";
import { mutationCall } from "../apiUtils";
import ParagraphText from "../components/ParagraphText";

const AccountHeader = ({ account, setAccount }) => {
    const openModal = useContext(ModalContext);

    const { user, setUser } = useContext(UserContext);

    const reportAccount = () => {
        mutationCall(
            "createFeedback",
            { info: 0, reporting: 0 },
            {
                accountScreenName: user?.screenName,
                info: "This is inappropriate",
                reportingObjectType: "Account",
                reportingObjectID: account.screenName,
            }
        ).then(() => {
            alert("Successfully reported account!");
            // TODO: Check for unsafe now
        });
    };

    const loggedInAsThisUser = user?.screenName === account.screenName;
    return (
        <div style={{ flexDirection: "row" }}>
            <div style={{ flex: 3, gap: 10 }}>
                <AccountPreview
                    account={account}
                    onClickImage={() => {
                        openModal(
                            <PictureModal
                                pictureURL={
                                    account.profilePicURL ||
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
                    <CrowdventureButton href="/notifications">
                        Notifications{" "}
                        {user.notifications.filter((notif) => !notif.seen)
                            .length ? (
                            <span style={{ color: "red" }}>
                                (
                                {
                                    user.notifications.filter(
                                        (notif) => !notif.seen
                                    ).length
                                }{" "}
                                New)
                            </span>
                        ) : null}
                    </CrowdventureButton>
                ) : (
                    user && (
                        <CrowdventureButton
                            onClick={() => {
                                openModal(<MessageModal account={account} />);
                            }}
                        >
                            Send Message
                        </CrowdventureButton>
                    )
                )}
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

                {!loggedInAsThisUser && (
                    <CrowdventureButton
                        category="error"
                        onClick={reportAccount}
                    >
                        Report Account
                    </CrowdventureButton>
                )}
            </div>
        </div>
    );
};

export default AccountHeader;
