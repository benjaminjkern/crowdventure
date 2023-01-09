import Image from "next/image";
import React, { useContext } from "react";
import { ModalContext } from "../modal";
import CrowdventureModal from "./CrowdventureModal";

const PictureModal = ({ title, pictureURL }) => {
    const { closeModal } = useContext(ModalContext);
    return (
        <CrowdventureModal
            modalTitle={title}
            modalButtons={[
                {
                    text: `Thanks for showing me this ${
                        Math.random() < 0.5 ? "cool" : "neat"
                    } picture!`,
                    onClick: closeModal,
                },
            ]}
        >
            <Image
                src={pictureURL}
                width={200}
                height={200}
                style={{
                    maxHeight: "70vh",
                }}
            />
        </CrowdventureModal>
    );
};

export default PictureModal;
