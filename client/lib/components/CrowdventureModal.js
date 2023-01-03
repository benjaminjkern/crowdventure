import React, { useContext } from "react";
import { ModalContext } from "../modal";
import CrowdventureButton from "./CrowdventureButton";

const CrowdventureModal = ({ modalTitle, children, modalButtons }) => {
    const { closeModal } = useContext(ModalContext);

    return (
        <div
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={closeModal}
        >
            <div style={{ width: 200 }}>
                <div>
                    {modalTitle}
                    <span onClick={closeModal}>X</span>
                </div>
                {children}
                {modalButtons.length && (
                    <div>
                        {modalButtons.map(({ text, ...props }, i) => (
                            <CrowdventureButton key={i} {...props}>
                                {text}
                            </CrowdventureButton>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrowdventureModal;
