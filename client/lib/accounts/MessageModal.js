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
            modalTitle={`Send message to ${account.screenName}`}
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
        >
            Message:
            <CrowdventureTextInput value={message} onChangeText={setMessage} />
        </CrowdventureModal>
    );
};

export default MessageModal;
