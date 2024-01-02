import React, { type CSSProperties, type ReactNode, useContext } from "react";
import { PaletteContext } from "../colorPalette";
import { ModalContext } from "../modal";
import CloseButton from "./CloseButton";
import CrowdventureButton, {
    type CrowdventureButtonProps,
} from "./CrowdventureButton";

export type ModalButton = {
    active?: boolean;
    text: string;
} & Omit<CrowdventureButtonProps, "children">;

type ModalProps = {
    readonly modalTitle?: string;
    readonly children: ReactNode;
    readonly modalButtons: ModalButton[];
    readonly modalStyle?: CSSProperties;
    readonly contentStyle?: CSSProperties;
};

const CrowdventureModal = ({
    modalTitle,
    children,
    modalButtons,
    modalStyle,
    contentStyle,
}: ModalProps) => {
    const { closeModal } = useContext(ModalContext);
    const { backgroundColor, lightBackgroundColor } =
        useContext(PaletteContext);

    return (
        <div
            onMouseDown={closeModal}
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                alignItems: "center",
                zIndex: 10,
                backgroundColor: "rgba(0,0,0,0.5)",
                overflow: "scroll",
                ...modalStyle,
            }}
        >
            <div
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
                style={{
                    margin: 50,
                    width: 600,
                    backgroundColor: backgroundColor[1],
                    padding: 20,
                    borderRadius: 20,
                }}
            >
                <div
                    style={{
                        position: "relative",
                        borderBottomColor: lightBackgroundColor,
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        textAlign: "center",
                        marginBottom: 10,
                        paddingBottom: 10,
                    }}
                >
                    {modalTitle}
                    <CloseButton
                        onClick={closeModal}
                        style={{ position: "absolute", top: 0, right: 0 }}
                    />
                </div>
                <div style={contentStyle}>{children}</div>
                {modalButtons.length ? (
                    <>
                        <hr />
                        <div style={{ gap: 10, flexDirection: "row" }}>
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
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default CrowdventureModal;
