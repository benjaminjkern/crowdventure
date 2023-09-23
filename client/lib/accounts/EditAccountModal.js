import React, { useState, useContext } from "react";

import CrowdventureModal from "../components/CrowdventureModal";
import ModalImage from "../components/ModalImage";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import { UserContext } from "../user";
import { ModalContext } from "../modal";
import ConfirmModal from "../components/ConfirmModal";
import { mutationCall } from "../apiUtils";
import { FULL_ACCOUNT_GQL } from "../../pages/account/[accountId]";
import { useRouter } from "next/router";

const EditAccountModal = ({ account, setAccount }) => {
    const [info, setInfo] = useState("");
    const { user, setUser } = useContext(UserContext);
    const { openModal, closeModal, closeAllModals } = useContext(ModalContext);
    const router = useRouter();

    const [bioField, setBioField] = useState(account.bio);
    const [profilePictureField, setProfilePictureField] = useState(
        account.profilePicURL
    );
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [hidden, setHidden] = useState(account.hidden);
    const [isAdmin, setAdmin] = useState(account.isAdmin);

    const editPage = () => {
        if (pass1 && pass2 && pass1 !== pass2) {
            setInfo(<div style={{ color: "red" }}>Passwords must match!</div>);
            return;
        }

        const params = { screenName: account.screenName };

        if (bioField !== account.bio) params.bio = bioField;
        if (profilePictureField !== account.profilePicURL)
            params.profilePicURL = profilePictureField;
        if (pass1) params.newPassword = pass1;
        if (user.isAdmin) {
            params.hidden = hidden;
            params.isAdmin = isAdmin;
        }

        mutationCall("editAccount", FULL_ACCOUNT_GQL, params).then(
            (newAccount) => {
                if (account.screenName === user?.screenName)
                    setUser(newAccount);

                setAccount(newAccount);
                closeModal();
            }
        );
    };

    const deleteAccount = () => {
        mutationCall(
            "deleteAccount",
            {},
            { screenName: account.screenName }
        ).then(() => {
            if (account.screenName === user?.screenName) setUser();

            setAccount();
            router.push("/");
            closeAllModals();
        });
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
                                content="This will erase all content created by this account, including all pages and suggested choices, and liked and disliked content. Are you sure you wish to continue?"
                                onConfirm={deleteAccount}
                                title="Delete Account"
                            />
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
                rows="3"
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
