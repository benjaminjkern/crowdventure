import React, { useContext, useState } from "react";
import { UserContext } from "../user";
import { FULL_ACCOUNT_GQL } from "../../pages/account/[accountId]";
import { mutationCall, queryCall } from "../apiUtils";
import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";

const SignUpModal = () => {
    const { closeModal } = useContext(ModalContext);
    const { setUser } = useContext(UserContext);
    const [info, setInfo] = useState("");

    const [screenName, setScreenName] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    const handleSubmitSignUp = () => {
        if (!screenName)
            return setInfo(
                <span style={{ color: "red" }}>
                    Please enter a screen name!
                </span>
            );
        if (!pass1)
            return setInfo(
                <span style={{ color: "red" }}>Please enter a password!</span>
            );
        if (pass1 !== pass2)
            return setInfo(
                <div style={{ color: "red" }}>Passwords must match!</div>
            );

        queryCall("getAccount", { screenName: 0 }, { screenName })
            .catch(() =>
                setInfo(
                    <div style={{ color: "red" }}>
                        That account already exists!
                    </div>
                )
            )
            .then(() =>
                mutationCall("createAccount", FULL_ACCOUNT_GQL, {
                    screenName,
                    password: pass1,
                })
            )
            .then((newUser) => {
                localStorage.setItem("screenName", screenName);
                setUser(newUser);
                closeModal();
            });
    };

    return (
        <CrowdventureModal
            modalTitle="Sign Up for Crowdventure!"
            modalButtons={[{ text: "Sign Up", onClick: handleSubmitSignUp }]}
        >
            Screen Name:
            <CrowdventureTextInput
                value={screenName}
                onChangeText={setScreenName}
            />
            Create Password:
            <CrowdventureTextInput
                type="password"
                value={pass1}
                onChangeText={setPass1}
            />
            Confirm Password:
            <CrowdventureTextInput
                type="password"
                value={pass2}
                onChangeText={setPass2}
            />
            {info ? info : ""}
        </CrowdventureModal>
    );
};

export default SignUpModal;
