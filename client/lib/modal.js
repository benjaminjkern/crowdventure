import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState();
    const openModal = setModal;
    const closeModal = () => setModal(undefined);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {modal}
            {children}
        </ModalContext.Provider>
    );
};
export default ModalProvider;
