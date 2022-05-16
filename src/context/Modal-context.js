import React, { createContext, useContext, useState } from 'react';
const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  return (
    <ModalContext.Provider
      value={{ showModal, setShowModal, showEditModal, setshowEditModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);
export { ModalProvider, useModal };
