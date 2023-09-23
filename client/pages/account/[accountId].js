import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { NODE_PREVIEW_GQL } from "..";
import { mutationCall, queryCall } from "../../lib/apiUtils";
import { UserContext } from "../../lib/user";
import LoadingBox from "../../lib/components/LoadingBox";
import { UnsafeModeContext } from "../../lib/unsafeMode";
import CrowdventureAlert from "../../lib/components/CrowdventureAlert";
import AccountPreview from "../../lib/accounts/AccountPreview";
import NodeViewer from "../../lib/nodes/NodeViewer";
import CrowdventureButton from "../../lib/components/CrowdventureButton";
import CrowdventureTextInput from "../../lib/components/CrowdventureTextInput";
import EditAccountModal from "../../lib/accounts/EditAccountModal";
import { ModalContext } from "../../lib/modal";
import MessageModal from "../../lib/accounts/MessageModal";
import PictureModal from "../../lib/components/PictureModal";

const AccountPage = ({ account: initAccount }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedNodes, setSearchedNodes] = useState([]);
    const [account, setAccount] = useState(initAccount);
    const { user, setUser } = useContext(UserContext);
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { openModal } = useContext(ModalContext);
    const router = useRouter();

    useEffect(() => {
        if (initAccount) setAccount(initAccount);
    }, [initAccount]);

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

    if (!account) return <LoadingBox />;

    if (
        account.hidden &&
        !unsafeMode &&
        account.screenName !== user?.screenName
    )
        return (
            <CrowdventureAlert title="Unsafe!">
                This page has been hidden from general users, because the
                content has been deemed unsafe. If you would like to see it, log
                in and turn on <b>Unsafe mode</b>!
            </CrowdventureAlert>
        );

    return (
        <>
            {account.hidden &&
            !unsafeMode &&
            account.screenName === user?.screenName ? (
                <CrowdventureAlert title="Unsafe!">
                    This page has been hidden from general users, because the
                    content has been deemed unsafe. Users in unsafe mode can see
                    this page and its content. Since you own this page, you can
                    see it. If you believe this page should be considered safe,
                    click <a href="">Here</a>.
                </CrowdventureAlert>
            ) : null}
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
            />

            {account.bio?.split("\n").map((line, i) => (
                <p key={i} style={{ textIndent: "5%" }}>
                    {line}
                </p>
            ))}

            {user?.screenName === account.screenName || user?.isAdmin ? (
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

            {user?.screenName === account.screenName ? (
                <>
                    <CrowdventureButton
                        onClick={() => {
                            setUser();
                        }}
                    >
                        Log out
                    </CrowdventureButton>
                    <CrowdventureButton
                        onClick={() => {
                            router.push("/notifications");
                        }}
                    >
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
                </>
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
            <div>
                {/** float right */}
                Total views: {account.totalNodeViews} Total score:{" "}
                {account.totalSuggestionScore}
            </div>

            {user?.screenName === account.screenName && (
                <CrowdventureButton
                    onClick={() => {
                        // showModal(
                        //     <CreateNodeModal
                        //         close={() => showModal(undefined)}
                        //         loggedInAs={loggedInAs}
                        //         featured={true}
                        //         callback={(res) =>
                        //             setRedirect(
                        //                 <Redirect to={`/node/${res.ID}`} />
                        //             )
                        //         }
                        //     />
                        // );
                    }}
                >
                    Create a New Adventure!
                </CrowdventureButton>
            )}

            <hr />

            <h3>Featured Stories:</h3>
            <NodeViewer nodes={account.featuredNodes} />

            <hr />

            <h3>Search All Pages Authored by {account.screenName}:</h3>
            <CrowdventureTextInput
                onChangeText={(newQuery) => {
                    console.log(account.nodes);
                    setSearchQuery(newQuery);
                    if (newQuery.length >= 2)
                        setSearchedNodes([
                            ...account.nodes.filter((node) =>
                                node.title
                                    .toLowerCase()
                                    .includes(newQuery.toLowerCase())
                            ),
                            ...account.nodes.filter(
                                (node) =>
                                    !node.title
                                        .toLowerCase()
                                        .includes(newQuery.toLowerCase()) &&
                                    node.content
                                        .toLowerCase()
                                        .includes(newQuery.toLowerCase())
                            ),
                        ]);
                    else setSearchedNodes([]);
                }}
                placeholder="Search for a page..."
                value={searchQuery}
            />
            {searchQuery ? <NodeViewer nodes={searchedNodes} /> : null}

            {user?.screenName !== account.screenName && (
                <CrowdventureButton onClick={reportAccount}>
                    Report Account
                </CrowdventureButton>
            )}
        </>
    );
};

export const getStaticPaths = async () => ({
    paths: [],
    fallback: true,
});

export const FULL_ACCOUNT_GQL = {
    bio: 0,
    screenName: 0,
    profilePicURL: 0,
    totalNodeViews: 0,
    totalSuggestionScore: 0,
    hidden: 0,
    isAdmin: 0,
    featuredNodes: NODE_PREVIEW_GQL,
    nodes: NODE_PREVIEW_GQL,
    notifications: {
        time: 0,
        seen: 0,
        content: 0,
        link: 0,
    },
};

export const getStaticProps = async ({ params: { accountId } }) => {
    const account = await queryCall("getAccount", FULL_ACCOUNT_GQL, {
        screenName: accountId,
    });

    if (!account) return { notFound: true };

    return {
        props: {
            account,
            pageTitle: `${account.screenName} on Crowdventure!`,
            previewImage: account.profilePicURL,
        },
    };
};

export default AccountPage;
