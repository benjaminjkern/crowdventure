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
    const openModal = (newModal: ReactNode) =>
        setModalStack([...modalStack, newModal]);
    const closeModal = () => setModalStack(modalStack.slice(0, -1));
    const closeAllModals = () => setModalStack([]);

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
