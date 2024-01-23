import React, { useContext } from "react";
import { ModalContext } from "../modal";
import CrowdventureModal from "./CrowdventureModal";

const PictureModal = ({
    title,
    pictureURL,
}: {
    readonly title: string;
    readonly pictureURL: string;
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
                    }}
                />
            </div>
        </CrowdventureModal>
    );
};

export default PictureModal;
