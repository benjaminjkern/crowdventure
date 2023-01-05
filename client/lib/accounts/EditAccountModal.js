import React, { useState, useContext } from "react";

import CrowdventureModal from "../components/CrowdventureModal";
import ModalImage from "../components/ModalImage";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import { UserContext } from "../user";
import { ModalContext } from "../modal";
import ConfirmModal from "../components/ConfirmModal";
import { mutationCall, queryCall } from "../apiUtils";
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
    const [nameField, setNameField] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [hidden, setHidden] = useState(account.hidden);
    const [isAdmin, setAdmin] = useState(account.isAdmin);

    const editPage = (checkedIfExists = false) => {
        if (pass1 && pass2 && pass1 !== pass2) {
            setInfo(<div style={{ color: "red" }}>Passwords must match!</div>);
            return;
        }

        const params = { screenName: account.screenName };

        if (bioField !== account.bio) params.bio = bioField;
        if (profilePictureField !== account.profilePicURL)
            params.profilePicURL = profilePictureField;
        if (
            nameField !== account.screenName &&
            nameField.match(/^[a-zA-Z0-9_]+$/)
        ) {
            if (!checkedIfExists) {
                queryCall(
                    "getAccount",
                    { screenName: 0 },
                    { screenName: nameField }
                )
                    .catch(() => editPage(true))
                    .then(() => {
                        setInfo(
                            <div style={{ color: "red" }}>
                                That account already exists!
                            </div>
                        );
                    });
                return;
            } else {
                params.newScreenName = nameField;
            }
        }
        if (pass1) params.newPassword = pass1;
        if (user.isAdmin) {
            params.hidden = hidden;
            params.isAdmin = isAdmin;
        }

        mutationCall("editAccount", FULL_ACCOUNT_GQL, params).then(
            (newAccount) => {
                if (params.newScreenName) {
                    localStorage.setItem("screenName", params.newScreenName);
                    router.push(`/account/${params.newScreenName}`);
                }
                if (account.screenName === user?.screenName) {
                    setUser(newAccount);
                }
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
            if (account.screenName === user?.screenName) {
                localStorage.removeItem("screenName");
                setUser();
            }
            setAccount();
            router.push("/");
            closeAllModals();
        });
    };

    return (
        <CrowdventureModal
            modalTitle="Editing Account"
            modalButtons={[
                { text: "Edit Account", onClick: editPage },
                {
                    text: "Delete Account",
                    onClick: () => {
                        openModal(
                            <ConfirmModal
                                title="Delete Account"
                                content="This will erase all content created by this account, including all pages and suggested choices, and liked and disliked content. Are you sure you wish to continue?"
                                onConfirm={deleteAccount}
                            />
                        );
                    },
                },
            ]}
        >
            <ModalImage
                src={account.profilePicURL}
                alt={`${account.screenName}'s Profile Pic`}
                style={{
                    opacity:
                        account.profilePicURL === profilePictureField ? 1 : 0.2,
                }}
            />
            Profile Pic URL:
            <CrowdventureTextInput
                value={profilePictureField}
                onChangeText={setProfilePictureField}
            />
            Bio:
            <CrowdventureTextInput
                rows="3"
                value={bioField}
                onChangeText={setBioField}
            />
            Change your screen name:
            <CrowdventureTextInput
                placeholder={account.screenName}
                value={nameField}
                onChangeText={setNameField}
            />
            Change your password:
            <CrowdventureTextInput
                type="password"
                placeholder="••••••••"
                value={pass1}
                onChangeText={setPass1}
            />
            {pass1 && (
                <>
                    Confirm password:
                    <CrowdventureTextInput
                        type="password"
                        placeholder="••••••••"
                        value={pass2}
                        onChangeText={setPass2}
                    />
                </>
            )}
            {user?.isAdmin && (
                <>
                    Admin Controls:
                    <CrowdventureCheckboxInput
                        checked={hidden}
                        onChange={setHidden}
                        label="Account should be hidden"
                    />
                    <CrowdventureCheckboxInput
                        checked={isAdmin}
                        onChange={setAdmin}
                        label="Account is an admin"
                    />
                </>
            )}
            {info}
        </CrowdventureModal>
    );
};
export default EditAccountModal;
