import React, { useContext } from "react";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { ModalContext } from "../modal";
import CrowdventureModal from "./CrowdventureModal";
import FallbackImage from "./FallbackImage";

const PictureModal = ({
    title,
    pictureURL,
    fallbackImage,
}: {
    readonly title: string;
    readonly pictureURL: string;
    readonly fallbackImage?: string | StaticImport;
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
            <div style={{ position: "relative", height: "calc(70vh)" }}>
                <FallbackImage
                    alt="A Cool Picture!"
                    fallbackSrc={fallbackImage}
                    fill
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
