import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { ModalContext } from "../modal";
import CloseButton from "./CloseButton";
import CrowdventureButton from "./CrowdventureButton";

const CrowdventureModal = ({
    modalTitle,
    children,
    modalButtons,
    modalStyle,
}) => {
    const { closeModal } = useContext(ModalContext);
    const { backgroundColor } = useContext(PaletteContext);

    return (
        <div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                alignItems: "center",
                zIndex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                overflow: "scroll",
                ...modalStyle,
            }}
            onClick={closeModal}
        >
            <div
                style={{
                    margin: 50,
                    width: 600,
                    backgroundColor: backgroundColor[1],
                    padding: 20,
                    borderRadius: 20,
                }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div style={{ position: "relative" }}>
                    {modalTitle}
                    <CloseButton onClick={closeModal} style={{ top: 0 }} />
                </div>
                {children}
                {modalButtons.length && (
                    <div>
                        {modalButtons.map(
                            ({ active = true, text, ...props }, i) => {
                                if (!active) return;
                                return (
                                    <CrowdventureButton key={i} {...props}>
                                        {text}
                                    </CrowdventureButton>
                                );
                            }
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrowdventureModal;
