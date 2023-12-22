import React, { useContext } from "react";
import { ModalContext } from "../modal";
import CrowdventureModal from "./CrowdventureModal";

const ConfirmModal = ({
    title,
    content,
    onConfirm,
}: {
    readonly title: string;
    readonly content: string;
    readonly onConfirm: () => void;
}) => {
    const { closeModal } = useContext(ModalContext);
    return (
        <CrowdventureModal
            modalButtons={[
                { text: "No!", onClick: closeModal },
                { text: "Yes!", onClick: onConfirm },
            ]}
            modalTitle={title}
        >
            {content}
        </CrowdventureModal>
    );
};

export default ConfirmModal;
