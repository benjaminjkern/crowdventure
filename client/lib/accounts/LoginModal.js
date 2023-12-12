import React, { useContext, useState } from "react";

import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../user";
import { mutationCall } from "../apiUtils";
import { LOGGED_IN_USER_GQL } from "../gqlDefs";
import { useInputForm } from "../hooks";

const LoginModal = () => {
    const loginForm = useInputForm({ screenName: "", password: "" });
    const [error, setError] = useState();

    const { setUser } = useContext(UserContext);
    const { closeModal } = useContext(ModalContext);

    const login = () => {
        const { screenName, password } = loginForm.getValues();
        if (!screenName) return setError("Please enter your password!");
        if (!password) return setError("Please enter your screenName!");

        mutationCall("loginAccount", LOGGED_IN_USER_GQL, {
            screenName,
            password,
        }).then((newUser) => {
            if (!newUser) {
                setError(
                    "That account does not exist or the password did not match!"
                );
                return;
            }

            setUser(newUser);
            closeModal();
        });
    };

    return (
        <CrowdventureModal
            contentStyle={{ gap: 5 }}
            modalButtons={[{ text: "Log in", onClick: login }]}
            modalTitle="Log in"
        >
            Screen Name:
            <CrowdventureTextInput
                formElement={loginForm.screenName}
                onChangeText={() => setError()}
            />
            Password:
            <CrowdventureTextInput
                formElement={loginForm.password}
                onChangeText={() => setError()}
                type="password"
            />
            {error ? <span style={{ color: "red" }}>{error}</span> : null}
        </CrowdventureModal>
    );
};

export default LoginModal;
