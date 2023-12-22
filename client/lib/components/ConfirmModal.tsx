import React, { useContext } from "react";
import { ModalContext } from "../modal";
import CrowdventureModal from "./CrowdventureModal";

const ConfirmModal = ({
    title,
    children,
    onConfirm,
}: {
    readonly title: string;
    readonly children: ReactNode;
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
            {children}
        </CrowdventureModal>
    );
};

export default ConfirmModal;
