import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { ModalContext } from "../modal";
import CrowdventureButton from "./CrowdventureButton";

const CrowdventureModal = ({ modalTitle, children, modalButtons }) => {
    const { closeModal } = useContext(ModalContext);
    const { backgroundColor } = useContext(PaletteContext);

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
                zIndex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onClick={closeModal}
        >
            <div
                style={{
                    width: 200,
                    backgroundColor: backgroundColor[1],
                    padding: 20,
                    borderRadius: 20,
                }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div>
                    {modalTitle}
                    <CrowdventureButton buttonType="text" onClick={closeModal}>
                        X
                    </CrowdventureButton>
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
