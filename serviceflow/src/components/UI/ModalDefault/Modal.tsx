import React, { useState } from "react";
import "./Modal.css";
import { FiX } from "react-icons/fi";

type ModalProps = {
  title: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  maxBodyHeight?: string; // nova prop opcional para max-height do corpo

};

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  footer,
  width = "600px",
  maxBodyHeight
}) => {
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  }

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isClosing ? "closing" : ""}`}>
      <div
        className={`modal-content-app ${isClosing ? "closing" : ""}`}
        style={{
          width,
          ...(maxBodyHeight ? { maxHeight: maxBodyHeight } : {}),
        }}
      >
        <header className="modal-header">
          <h2>{title}</h2>
          <button onClick={handleClose} className="close-button">
            <FiX size={20} />
          </button>
        </header>

        <div className="modal-body">{children}</div>

        {footer && <footer className="modal-footer">{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;