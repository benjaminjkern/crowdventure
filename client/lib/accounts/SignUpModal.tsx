import React, { useContext } from "react";
import { UserContext } from "../user";
import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { useInputForm } from "../hooks";
import apiClient from "../apiClient";

const SignUpModal = () => {
    const { closeModal } = useContext(ModalContext);
    const { setUser } = useContext(UserContext);

    const signupForm = useInputForm({ screenName: "", pass1: "", pass2: "" });

    const handleSubmitSignUp = async () => {
        const { screenName, pass1, pass2 } = signupForm.getValues();
        if (!screenName)
            return signupForm.setError("Please enter a screen name!");
        if (!pass1) return signupForm.setError("Please enter a password!");
        if (pass1 !== pass2)
            return signupForm.setError("Passwords must match!");

        const response = await apiClient.provide(
            "post",
            "/account/createAccount",
            { screenName, password: pass1 }
        );
        if (response.status === "error")
            return signupForm.setError(response.error.message);

        setUser(response.data);
        closeModal();
    };

    return (
        <CrowdventureModal
            contentStyle={{ gap: 5 }}
            modalButtons={[{ text: "Sign Up", onClick: handleSubmitSignUp }]}
            modalTitle="Sign Up for Crowdventure!"
        >
            Screen Name:
            <CrowdventureTextInput formElement={signupForm.screenName} />
            Create Password:
            <CrowdventureTextInput
                formElement={signupForm.pass1}
                type="password"
            />
            Confirm Password:
            <CrowdventureTextInput
                formElement={signupForm.pass2}
                type="password"
            />
            {signupForm.getError()}
        </CrowdventureModal>
    );
};

export default SignUpModal;
