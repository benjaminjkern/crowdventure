import React, { type ReactNode, createContext, useState } from "react";

type ModalContextType = {
    openModal: (newModal: ReactNode) => void;
    closeModal: () => void;
    closeAllModals: () => void;
};

export const ModalContext = createContext<ModalContextType>(
    {} as ModalContextType
);

const ModalProvider = ({ children }: { readonly children: ReactNode }) => {
    const [modalStack, setModalStack] = useState<ReactNode[]>([]);

    // TODO: Lock the body scrolling in a less hacky way!
    const openModal = (newModal: ReactNode) => {
        document.body.style.overflowY = "hidden";
        setModalStack([...modalStack, newModal]);
    };
    const closeModal = () => {
        setModalStack(modalStack.slice(0, -1));
        if (modalStack.length === 1) document.body.style.overflowY = "auto";
    };
    const closeAllModals = () => {
        setModalStack([]);
        document.body.style.overflowY = "auto";
    };

    return (
        <ModalContext.Provider
            value={{ openModal, closeModal, closeAllModals }}
        >
            {modalStack.map((modal, i) => (
                <div key={i}>{modal}</div>
            ))}
            {children}
        </ModalContext.Provider>
    );
};
export default ModalProvider;
