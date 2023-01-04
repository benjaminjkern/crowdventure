import React, { useContext, useEffect, useState } from "react";

import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../user";
import { mutationCall } from "../apiUtils";

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

        mutationCall(
            "loginAccount",
            {
                screenName: 0,
                profilePicURL: 0,
                isAdmin: 0,
                notifications: {
                    seen: 0,
                },
            },
            { screenName, password }
        ).then((newUser) => {
            if (!newUser) {
                setInfo(
                    <div style={{ color: "red" }}>
                        That account does not exist or the password did not
                        match!
                    </div>
                );
                return;
            }

            localStorage.setItem("screenName", screenName);
            setUser(newUser);
            closeModal();
        });
    };

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
