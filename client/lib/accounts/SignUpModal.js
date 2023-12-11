import React, { useContext, useState } from "react";
import { UserContext } from "../user";
import { mutationCall, queryCall } from "../apiUtils";
import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { useStatelessValue } from "../hooks";
import { LOGGED_IN_USER_GQL } from "../gqlDefs";

const SignUpModal = () => {
    const { closeModal } = useContext(ModalContext);
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState();

    const screenName = useStatelessValue();
    const pass1 = useStatelessValue();
    const pass2 = useStatelessValue();

    const handleSubmitSignUp = () => {
        if (!screenName) return setError("Please enter a screen name!");
        if (!pass1) return setError("Please enter a password!");
        if (pass1 !== pass2) return setError("Passwords must match!");

        queryCall("getAccount", { screenName: 0 }, { screenName })
            .catch(() => setError("That account already exists!"))
            .then(() =>
                mutationCall("createAccount", LOGGED_IN_USER_GQL, {
                    screenName,
                    password: pass1,
                })
            )
            .then((newUser) => {
                setUser(newUser);
                closeModal();
            });
    };

    return (
        <CrowdventureModal
            contentStyle={{ gap: 5 }}
            modalButtons={[{ text: "Sign Up", onClick: handleSubmitSignUp }]}
            modalTitle="Sign Up for Crowdventure!"
        >
            Screen Name:
            <CrowdventureTextInput statelessValue={screenName} />
            Create Password:
            <CrowdventureTextInput statelessValue={pass1} type="password" />
            Confirm Password:
            <CrowdventureTextInput statelessValue={pass2} type="password" />
            {error ? <span style={{ color: "red" }}>{error}</span> : ""}
        </CrowdventureModal>
    );
};

export default SignUpModal;
