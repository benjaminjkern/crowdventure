import React, { useContext, useEffect, useState } from "react";

import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../user";
import { mutationCall } from "../apiUtils";
import { FULL_ACCOUNT_GQL } from "../../pages/account/[accountId]";

const LoginModal = () => {
    const [info, setInfo] = useState("");
    const [screenName, setScreenName] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(UserContext);
    const { closeModal } = useContext(ModalContext);

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

        mutationCall("loginAccount", FULL_ACCOUNT_GQL, {
            screenName,
            password,
        }).then((newUser) => {
            if (!newUser) {
                setInfo(
                    <div style={{ color: "red" }}>
                        That account does not exist or the password did not
                        match!
                    </div>
                );
                return;
            }

            setUser(newUser);
            closeModal();
        });
    };

    useEffect(() => {
        setInfo("");
    }, [screenName, password]);

    return (
        <CrowdventureModal
            contentStyle={{ gap: 5 }}
            modalButtons={[{ text: "Log in", onClick: login }]}
            modalTitle="Log in"
        >
            Screen Name:
            <CrowdventureTextInput
                onChangeText={setScreenName}
                value={screenName}
            />
            Password:
            <CrowdventureTextInput
                onChangeText={setPassword}
                type="password"
                value={password}
            />
            {info ? info : ""}
        </CrowdventureModal>
    );
};

export default LoginModal;
