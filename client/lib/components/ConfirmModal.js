import React, { useContext } from "react";
import { ModalContext } from "../modal";
import CrowdventureModal from "./CrowdventureModal";

const ConfirmModal = ({ title, content, onConfirm }) => {
    const { closeModal } = useContext(ModalContext);
    return (
        <CrowdventureModal
            modalTitle={title}
            modalButtons={[
                { text: "No!", onClick: closeModal },
                { text: "Yes!", onClick: onConfirm },
            ]}
        >
            {content}
        </CrowdventureModal>
    );
};

export default ConfirmModal;
