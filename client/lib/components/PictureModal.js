import Image from "next/image";
import React, { useContext } from "react";
import { ModalContext } from "../modal";
import CrowdventureModal from "./CrowdventureModal";

const PictureModal = ({ title, pictureURL }) => {
    const { closeModal } = useContext(ModalContext);
    return (
        <CrowdventureModal
            modalButtons={[
                {
                    text: `Thanks for showing me this ${
                        Math.random() < 0.5 ? "cool" : "neat"
                    } picture!`,
                    onClick: closeModal,
                },
            ]}
            modalTitle={title}
        >
            <Image
                height={200}
                src={pictureURL}
                style={{
                    maxHeight: "70vh",
                }}
                width={200}
            />
        </CrowdventureModal>
    );
};

export default PictureModal;
