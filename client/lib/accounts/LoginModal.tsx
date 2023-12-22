import React, { useContext } from "react";

import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../user";
import { useInputForm } from "../hooks";
import apiClient from "../apiClient";

const LoginModal = () => {
    const loginForm = useInputForm({ screenName: "", password: "" });

    const { setUser } = useContext(UserContext);
    const { closeModal } = useContext(ModalContext);

    const login = async () => {
        const { screenName, password } = loginForm.getValues();
        if (!screenName)
            return loginForm.setError("Please enter your password!");
        if (!password)
            return loginForm.setError("Please enter your screenName!");

        const response = await apiClient.provide("post", "/account/login", {
            screenName,
            password,
        });
        if (response.status === "error")
            return loginForm.setError(response.error.message);
        setUser(response.data);
        closeModal();
    };

    return (
        <CrowdventureModal
            contentStyle={{ gap: 5 }}
            modalButtons={[{ text: "Log in", onClick: login }]}
            modalTitle="Log in"
        >
            Screen Name:
            <CrowdventureTextInput formElement={loginForm.screenName} />
            Password:
            <CrowdventureTextInput
                formElement={loginForm.password}
                type="password"
            />
            {loginForm.getError()}
        </CrowdventureModal>
    );
};

export default LoginModal;
