import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";

import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../user";

const LoginModal = () => {
    const [info, setInfo] = useState("");
    const [screenName, setScreenName] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(UserContext);
    const { closeModal } = useContext(ModalContext);

    const [loginAccount, { data: { loginAccount: newUser } = {} }] =
        useMutation(gql`
            mutation Login($screenName: String!, $password: String!) {
                loginAccount(screenName: $screenName, password: $password) {
                    screenName
                    profilePicURL
                    isAdmin
                    notifications {
                        seen
                    }
                }
            }
        `);

    const login = () => {
        if (!screenName)
            return setInfo(
                <span style={{ color: "red" }}>
                    Please enter your password!
                </span>
            );
        if (!password)
            return setInfo(
                <span style={{ color: "red" }}>
                    Please enter your screenName!
                </span>
            );

        loginAccount({ variables: { screenName, password } });
    };

    useEffect(() => {
        if (!newUser) {
            setInfo(
                <div style={{ color: "red" }}>
                    That account does not exist or the password did not match!
                </div>
            );
            return;
        }

        localStorage.setItem("user", screenName);
        setUser(newUser);
        closeModal();
    }, [newUser]);

    useEffect(() => {
        setInfo("");
    }, [screenName, password]);

    return (
        <CrowdventureModal
            modalTitle="Log in"
            modalButtons={[{ text: "Log in", onClick: login }]}
        >
            Screen Name:
            <CrowdventureTextInput
                value={screenName}
                onChangeText={setScreenName}
            />
            Password:
            <CrowdventureTextInput
                type="password"
                value={password}
                onChangeText={setPassword}
            />
            {info ? info : ""}
        </CrowdventureModal>
    );
};

export default LoginModal;
