import React, { useContext } from "react";
import { UserContext } from "../user";
import { mutationCall, queryCall } from "../apiUtils";
import { ModalContext } from "../modal";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { useInputForm } from "../hooks";
import { LOGGED_IN_USER_GQL } from "../gqlDefs";

const SignUpModal = () => {
    const { closeModal } = useContext(ModalContext);
    const { setUser } = useContext(UserContext);

    const signupForm = useInputForm({ screenName: "", pass1: "", pass2: "" });

    const handleSubmitSignUp = () => {
        const { screenName, pass1, pass2 } = signupForm.getValues();
        if (!screenName)
            return signupForm.setError("Please enter a screen name!");
        if (!pass1) return signupForm.setError("Please enter a password!");
        if (pass1 !== pass2)
            return signupForm.setError("Passwords must match!");

        queryCall("getAccount", { screenName: 0 }, { screenName })
            .catch(() => signupForm.setError("That account already exists!"))
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
