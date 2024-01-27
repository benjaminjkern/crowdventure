import React, { type ReactNode, createContext, useState } from "react";
import { useScrollBlock } from "./hooks";

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
    const [blockScroll, allowScroll] = useScrollBlock();

    const openModal = (newModal: ReactNode) => {
        setModalStack([...modalStack, newModal]);
        blockScroll();
    };
    const closeModal = () => {
        setModalStack(modalStack.slice(0, -1));
        if (modalStack.length <= 1) allowScroll();
    };
    const closeAllModals = () => {
        setModalStack([]);
        allowScroll();
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
