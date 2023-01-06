import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [modalStack, setModalStack] = useState([]);
    const openModal = (newModal) => setModalStack([...modalStack, newModal]);
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
