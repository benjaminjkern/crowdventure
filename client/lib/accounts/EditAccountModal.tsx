import React, {
    type Dispatch,
    type SetStateAction,
    useContext,
    useState,
} from "react";
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

    const editAccountForm = useInputForm({
        bio: account.bio ?? "",
        screenName: account.screenName,
        profilePicURL: account.profilePicURL ?? "",
        oldPassword: "",
        pass1: "",
        pass2: "",
        hidden: account.hidden,
        isAdmin: account.isAdmin,
    });

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
            bio?: string | undefined;
            profilePicURL?: string | undefined;
            hidden?: boolean | undefined;
            isAdmin?: boolean | undefined;
        } = { id: account.id, bio, profilePicURL: profilePicURL || undefined };

        if (bio && bio !== account.bio) params.bio = bio;
        if (profilePicURL && profilePicURL !== account.profilePicURL)
            params.profilePicURL = profilePicURL;
        if (pass1) params.newPassword = pass1;
        if (user.isAdmin) {
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
        closeModal();
    };

    const deleteAccount = async () => {
        const response = await apiClient.provide("delete", "/node/deleteNode", {
            id: String(account.id),
        });
        if (response.status === "error") return alert(response.error.message);

        closeAllModals();
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
                        account.profilePicURL === profilePictureField ? 1 : 0.2,
                }}
            />
            {account.screenName}
            Profile Pic URL:
            <CrowdventureTextInput
                onChangeText={setProfilePictureField}
                value={profilePictureField}
            />
            Bio:
            <CrowdventureTextInput
                onChangeText={setBioField}
                rows={3}
                value={bioField}
            />
            Change your password:
            <CrowdventureTextInput
                onChangeText={setPass1}
                placeholder="••••••••"
                type="password"
                value={pass1}
            />
            {pass1 ? (
                <>
                    Confirm password:
                    <CrowdventureTextInput
                        onChangeText={setPass2}
                        placeholder="••••••••"
                        type="password"
                        value={pass2}
                    />
                </>
            ) : null}
            {user?.isAdmin ? (
                <>
                    Admin Controls:
                    <CrowdventureCheckboxInput
                        checked={hidden}
                        label="Account should be hidden"
                        onChange={setHidden}
                    />
                    <CrowdventureCheckboxInput
                        checked={isAdmin}
                        label="Account is an admin"
                        onChange={setAdmin}
                    />
                </>
            ) : null}
            {info}
        </CrowdventureModal>
    );
};
export default EditAccountModal;
