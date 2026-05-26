// import React, { useState } from "react";
// import "./Modal.css";
// import { FiX } from "react-icons/fi";

// type ModalProps = {
//   title: React.ReactNode;
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   footer?: React.ReactNode;
//   width?: string;
//   maxBodyHeight?: string; // nova prop opcional para max-height do corpo

// };

// const Modal: React.FC<ModalProps> = ({
//   title,
//   isOpen,
//   onClose,
//   children,
//   footer,
//   width = "600px",
//   maxBodyHeight
// }) => {
//   const [isClosing, setIsClosing] = useState(false);

//   function handleClose() {
//     setIsClosing(true);
//     setTimeout(() => {
//       setIsClosing(false);
//       onClose();
//     }, 500);
//   }

//   if (!isOpen) return null;

//   return (
//     <div className={`modal-overlay ${isClosing ? "closing" : ""}`}>
//       <div
//         className={`modal-content-app ${isClosing ? "closing" : ""}`}
//         style={{
//           width,
//           ...(maxBodyHeight ? { maxHeight: maxBodyHeight } : {}),
//         }}
//       >
//         <header className="modal-header">
//           <h2>{title}</h2>
//           <button onClick={handleClose} className="close-button">
//             <FiX size={20} />
//           </button>
//         </header>

//         <div className="modal-body">{children}</div>

//         {footer && <footer className="modal-footer">{footer}</footer>}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React, { useState } from "react";
import "./Modal.css";
import { FiX, FiMaximize2, FiMinimize2 } from "react-icons/fi";

type ModalProps = {
  title: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  maxBodyHeight?: string;
  allowMaximize?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  footer,
  width = "600px",
  maxBodyHeight,
  allowMaximize = false,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsMaximized(false);
      onClose();
    }, 500);
  }

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isClosing ? "closing" : ""} ${isMaximized ? "modal-overlay--maximized" : ""}`}>
      <div
        className={`modal-content-app ${isClosing ? "closing" : ""} ${isMaximized ? "modal-content-app--maximized" : ""}`}
        style={
          isMaximized
            ? {} // CSS cuida tudo no modo maximizado
            : {
              width,
              ...(maxBodyHeight ? { maxHeight: maxBodyHeight } : {}),
            }
        }
      >
        <header className="modal-header">
          <h2>{title}</h2>
          <div className="modal-header-actions">
            {allowMaximize && (
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="maximize-button"
                title={isMaximized ? "Restaurar" : "Maximizar"}
              >
                {isMaximized ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
              </button>
            )}
            <button onClick={handleClose} className="close-button">
              <FiX size={20} />
            </button>
          </div>
        </header>

        <div className="modal-body">{children}</div>

        {footer && <footer className="modal-footer">{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;