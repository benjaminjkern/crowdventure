import React, { useState, useContext, useEffect } from "react";
import { type GetStaticPropsContext } from "next";

import { UserContext } from "+/lib/user";
import LoadingBox from "+/lib/components/LoadingBox";
import { UnsafeModeContext } from "+/lib/unsafeMode";
import CrowdventureAlert from "+/lib/components/CrowdventureAlert";
import NodeViewer from "+/lib/nodes/NodeViewer";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import AccountHeader from "+/lib/accounts/AccountHeader";
import { ModalContext } from "+/lib/modal";
import CreateNodeModal from "+/lib/nodes/CreateNodeModal";

import { type Node, type Account } from "@/types/models";

const AccountPage = ({
    account: initAccount,
}: {
    readonly account: Account;
}) => {
    const [account, setAccount] = useState(initAccount);
    const { user } = useContext(UserContext);
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { openModal } = useContext(ModalContext);

    const accountNodes: Node[] = [];

    useEffect(() => {
        if (initAccount) setAccount(initAccount);
    }, [initAccount]);

    if (!account) return <LoadingBox />;

    const loggedInAsThisUser = user?.screenName === account.screenName;

    if (account.hidden && !unsafeMode && !loggedInAsThisUser)
        return (
            <CrowdventureAlert title="Unsafe!">
                This page has been hidden from general users, because the
                content has been deemed unsafe. If you would like to see it, log
                in and turn on <b>Unsafe mode</b>!
            </CrowdventureAlert>
        );

    return (
        <>
            {account.hidden && !unsafeMode && loggedInAsThisUser ? (
                <CrowdventureAlert title="Unsafe!">
                    This page has been hidden from general users, because the
                    content has been deemed unsafe. Users in unsafe mode can see
                    this page and its content. Since you own this page, you can
                    see it. If you believe this page should be considered safe,
                    click <a href="">Here</a>.
                </CrowdventureAlert>
            ) : null}

            <AccountHeader account={account} setAccount={setAccount} />

            {loggedInAsThisUser ? (
                <CrowdventureButton
                    onClick={() => openModal(<CreateNodeModal featured />)}
                    style={{ marginTop: 10 }}
                >
                    Create a New Adventure!
                </CrowdventureButton>
            ) : null}

            <div style={{ alignItems: "flex-end", marginTop: 10 }}>
                Total views: {account.totalNodeViews} Total score:{" "}
                {account.totalSuggestionScore}
            </div>

            {/* <hr /> */}

            <h3>Featured Stories:</h3>
            <NodeViewer nodes={accountNodes} />
        </>
    );
};

export const getStaticPaths = () => ({
    paths: [],
    fallback: "blocking",
});

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ accountScreenName: string }>) => {
    const account = {};

    return {
        props: {
            account,
            pageTitle: `${account.screenName} on Crowdventure!`,
            previewImage: account.profilePicURL,
        },
    };
};

export default AccountPage;
