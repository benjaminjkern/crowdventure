import Image from "next/image";
import React, { useContext } from "react";
import { ModalContext } from "../modal";
import CrowdventureModal from "./CrowdventureModal";

const PictureModal = ({
    title,
    pictureURL,
}: {
    title: string;
    pictureURL: string;
}) => {
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
            <div style={{ position: "relative" }}>
                <img
                    alt="A Cool Picture!"
                    src={pictureURL}
                    style={{
                        objectFit: "cover",
                        maxHeight: "70vh",
                    }}
                />
            </div>
        </CrowdventureModal>
    );
};

export default PictureModal;
