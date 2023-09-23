import React, { useContext, useState } from "react";
import { mutationCall } from "../apiUtils";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { ModalContext } from "../modal";
import { UserContext } from "../user";

const MessageModal = ({ account }) => {
    const [message, setMessage] = useState("");
    const { user } = useContext(UserContext);
    const { closeModal } = useContext(ModalContext);

    return (
        <CrowdventureModal
            modalButtons={[
                {
                    disabled: message.length === 0,
                    text: "Send!",
                    onClick: () => {
                        mutationCall(
                            "createNotification",
                            { time: 0 },
                            {
                                accountScreenName: account.screenName,
                                content: `${user.screenName} sent you a message: '${message}'`,
                                link: `/account/${user.screenName}`,
                            }
                        ).then(() => {
                            alert("Message sent!");
                            closeModal();
                        });
                    },
                },
            ]}
            modalTitle={`Send message to ${account.screenName}`}
        >
            Message:
            <CrowdventureTextInput onChangeText={setMessage} value={message} />
        </CrowdventureModal>
    );
};

export default MessageModal;
