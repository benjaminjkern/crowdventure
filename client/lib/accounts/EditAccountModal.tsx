import React, { type Dispatch, type SetStateAction, useContext } from "react";
import { useRouter } from "next/router";

import CrowdventureModal from "../components/CrowdventureModal";
import ModalImage from "../components/ModalImage";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import ConfirmModal from "../components/ConfirmModal";

import { UserContext } from "../user";
import { ModalContext } from "../modal";
import { useInputForm } from "../hooks";

import apiClient from "../apiClient";
import { type Account } from "@/types/models";

const EditAccountModal = ({
    account,
    setAccount,
}: {
    readonly account: Account;
    readonly setAccount: Dispatch<SetStateAction<Account>>;
}) => {
    const { user, setUser } = useContext(UserContext);
    const { openModal, closeModal, closeAllModals } = useContext(ModalContext);
    const router = useRouter();

    const editAccountForm = useInputForm(
        {
            bio: account.bio ?? "",
            screenName: account.screenName,
            profilePicURL: account.profilePicURL ?? "",
            oldPassword: "",
            pass1: "",
            pass2: "",
            hidden: account.hidden,
            isAdmin: account.isAdmin,
        },
        ["profilePicURL", "pass1"]
    );

    const editPage = async () => {
        const {
            pass1,
            pass2,
            bio,
            screenName,
            profilePicURL,
            oldPassword,
            hidden,
            isAdmin,
        } = editAccountForm.getValues();
        if (pass1 && pass2 && pass1 !== pass2) {
            editAccountForm.setError("Passwords must match!");
            return;
        }

        const params: {
            id: number;
            screenName?: string | undefined;
            oldPassword?: string | undefined;
            newPassword?: string | undefined;
            bio?: string | null | undefined;
            profilePicURL?: string | null | undefined;
            hidden?: boolean | undefined;
            isAdmin?: boolean | undefined;
        } = {
            id: account.id,
            screenName,
            bio: bio || null,
            profilePicURL: profilePicURL || null,
            oldPassword,
            newPassword: pass1,
        };
        if (user?.isAdmin) {
            params.hidden = hidden;
            params.isAdmin = isAdmin;
        }

        const response = await apiClient.provide(
            "patch",
            "/account/editAccount",
            params
        );
        if (response.status === "error") return alert(response.error.message);
        setAccount(response.data);
        if (user?.id === account.id) setUser(response.data);
        closeModal();
    };

    const deleteAccount = async () => {
        const response = await apiClient.provide(
            "delete",
            "/account/deleteAccount",
            {
                id: String(account.id),
            }
        );
        if (response.status === "error") return alert(response.error.message);

        closeAllModals();
        if (user?.id === account.id) setUser(undefined);
        router.push("/");
    };

    return (
        <CrowdventureModal
            modalButtons={[
                { text: "Edit Account", onClick: editPage },
                {
                    text: "Delete Account",
                    onClick: () => {
                        openModal(
                            <ConfirmModal
                                onConfirm={deleteAccount}
                                title="Delete Account"
                            >
                                This will erase all content created by this
                                account, including all pages and suggested
                                choices, and liked and disliked content. Are you
                                sure you wish to continue?
                            </ConfirmModal>
                        );
                    },
                },
            ]}
            modalTitle="Editing Account"
        >
            <ModalImage
                alt={`${account.screenName}'s Profile Pic`}
                src={account.profilePicURL}
                style={{
                    opacity:
                        account.profilePicURL ===
                        editAccountForm.getValues().profilePicURL
                            ? 1
                            : 0.2,
                }}
            />
            {account.screenName}
            Profile Pic URL:
            <CrowdventureTextInput
                formElement={editAccountForm.profilePicURL}
            />
            Bio:
            <CrowdventureTextInput formElement={editAccountForm.bio} rows={3} />
            Change your password:
            <CrowdventureTextInput
                formElement={editAccountForm.oldPassword}
                placeholder="Old password"
                type="password"
            />
            <CrowdventureTextInput
                formElement={editAccountForm.pass1}
                placeholder="New password"
                type="password"
            />
            {editAccountForm.getValues().pass1 ? (
                <>
                    Confirm password:
                    <CrowdventureTextInput
                        formElement={editAccountForm.pass2}
                        placeholder="New password again"
                        type="password"
                    />
                </>
            ) : null}
            {user?.isAdmin ? (
                <>
                    Admin Controls:
                    <CrowdventureCheckboxInput
                        formElement={editAccountForm.hidden}
                        label="Account should be hidden"
                    />
                    <CrowdventureCheckboxInput
                        formElement={editAccountForm.pass2}
                        label="Account is an admin"
                    />
                </>
            ) : null}
            {editAccountForm.getError()}
        </CrowdventureModal>
    );
};
export default EditAccountModal;
