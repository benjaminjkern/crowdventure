import React, { useState, useContext, useEffect } from "react";

import { type GetStaticPropsResult } from "next";
import Link from "next/link";
import { type DefaultPageProps } from "../_app";
import { UserContext } from "+/lib/user";
import LoadingBox from "+/lib/components/LoadingBox";
import { UnsafeModeContext } from "+/lib/unsafeMode";
import CrowdventureAlert from "+/lib/components/CrowdventureAlert";
import NodeViewer from "+/lib/nodes/NodeViewer";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import AccountHeader from "+/lib/accounts/AccountHeader";
import { ModalContext } from "+/lib/modal";

import { type Node, type Account } from "@/types/models";
import apiClient from "+/lib/apiClient";
import { useSafeGuardedNodes } from "+/lib/specialHooks";
import { CreateNodeModal } from "+/lib/nodes/NodeModal";
import { PaletteContext } from "+/lib/colorPalette";

const getAccountNodes = async (accountId: number, unsafeMode: boolean) => {
    const nodesResponse = await apiClient.provide(
        "get",
        "/node/featuredNodes",
        {
            allowHidden: String(unsafeMode),
            ownedByAccount: String(accountId),
        }
    );
    if (nodesResponse.status === "error")
        throw new Error(nodesResponse.error.message);

    return nodesResponse.data.nodes;
};

type AccountPageProps = {
    readonly account: Account;
    readonly accountNodes: Node[];
};

const AccountPage = ({
    account: initAccount,
    accountNodes: initAccountNodes,
}: AccountPageProps) => {
    const [account, setAccount] = useState(initAccount);
    const [accountNodes, setAccountNodes] = useSafeGuardedNodes(
        initAccountNodes,
        () => getAccountNodes(account.id, true)
    );
    const { user } = useContext(UserContext);
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { openModal } = useContext(ModalContext);
    const { mutedTextColor } = useContext(PaletteContext);

    useEffect(() => {
        if (initAccount) setAccount(initAccount);
        if (initAccountNodes)
            setAccountNodes({ safeNodes: initAccountNodes, allNodes: [] });
    }, [initAccount]);

    if (!account) return <LoadingBox />;

    const loggedInAsThisUser = user?.screenName === account.screenName;

    if (account.hidden && !unsafeMode && !loggedInAsThisUser)
        return (
            <CrowdventureAlert goBackButton title="Unsafe!">
                This page has been hidden from general users, because the
                content has been deemed unsafe. If you would like to see it, log
                in and turn on <b>Unsafe mode</b>!
            </CrowdventureAlert>
        );

    return (
        <>
            {account.hidden && !unsafeMode && loggedInAsThisUser ? (
                <CrowdventureAlert style={{ marginBottom: 10 }} title="Unsafe!">
                    This page has been hidden from general users, because the
                    content has been deemed unsafe. Users in unsafe mode can see
                    this page and its content. Since you own this page, you can
                    see it. If you believe this page should be considered safe,
                    click <Link href="/">here</Link>.
                </CrowdventureAlert>
            ) : null}

            <AccountHeader account={account} setAccount={setAccount} />
            <hr />
            {loggedInAsThisUser ? (
                <CrowdventureButton
                    onClick={() =>
                        openModal(
                            <CreateNodeModal
                                featured
                                onCreateNode={(node) => {
                                    setAccountNodes((currAccountNodes) => ({
                                        safeNodes: node.hidden
                                            ? currAccountNodes.safeNodes
                                            : [
                                                  ...currAccountNodes.safeNodes,
                                                  node,
                                              ],
                                        allNodes: [
                                            ...currAccountNodes.allNodes,
                                            node,
                                        ],
                                    }));
                                }}
                            />
                        )
                    }
                    style={{ marginTop: 10 }}
                >
                    Create a New Adventure!
                </CrowdventureButton>
            ) : null}

            <div style={{ alignItems: "flex-end", marginTop: 10 }}>
                Total views: {account.totalNodeViews} Total score:{" "}
                {account.totalSuggestionScore}
            </div>

            {accountNodes.length ? (
                <NodeViewer
                    nodes={accountNodes}
                    onDeleteNode={(nodeId) => {
                        setAccountNodes((currAccountNodes) => ({
                            safeNodes: currAccountNodes.safeNodes.filter(
                                (accountNode) => accountNode.id !== nodeId
                            ),
                            allNodes: currAccountNodes.allNodes.filter(
                                (accountNode) => accountNode.id !== nodeId
                            ),
                        }));
                    }}
                    onEditNode={(node) => {
                        setAccountNodes((currAccountNodes) => ({
                            safeNodes: currAccountNodes.safeNodes.map(
                                (currNode) => {
                                    if (currNode.id !== node.id)
                                        return currNode;
                                    return node;
                                }
                            ),
                            allNodes: currAccountNodes.allNodes.map(
                                (currNode) => {
                                    if (currNode.id !== node.id)
                                        return currNode;
                                    return node;
                                }
                            ),
                        }));
                    }}
                />
            ) : (
                <span style={{ color: mutedTextColor, marginTop: 20 }}>
                    {account.screenName} doesn&apos;t have any owned pages!
                </span>
            )}
        </>
    );
};

export const getStaticPaths = () => ({
    paths: [],
    fallback: "blocking",
});

export const getStaticProps = async ({
    params: { accountScreenName },
}: {
    params: { accountScreenName: string };
}): Promise<GetStaticPropsResult<AccountPageProps & DefaultPageProps>> => {
    const accountResponse = await apiClient.provide(
        "get",
        "/account/getAccount",
        { screenName: accountScreenName }
    );
    if (accountResponse.status === "error")
        throw new Error(accountResponse.error.message);
    const account = accountResponse.data.account;

    if (!account) return { notFound: true };

    return {
        props: {
            account,
            accountNodes: await getAccountNodes(account.id, false),
            pageTitle: `${account.screenName} on Crowdventure!`,
            previewImage: account.profilePicURL,
        },
        revalidate: 1,
    };
};

export default AccountPage;
