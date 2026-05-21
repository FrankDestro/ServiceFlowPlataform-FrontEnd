import Modal from "react-modal";

Modal.setAppElement("#root");

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    confirmColor?: string;
};

function ModalConfirm({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmar ação",
    message = "Tem certeza que deseja continuar?",
    confirmText = "Confirmar",
    confirmColor = "#dc2626",
}: Props) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={title}
            overlayClassName="modal-annotation-overlay"
            className="modal-annotation-content"
        >
            <h2 className="modal-annotation-title">{title}</h2>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>{message}</p>
            <div className="modal-annotation-footer">
                <button className="modal-annotation-cancel" onClick={onClose}>Cancelar</button>
                <button
                    className="modal-annotation-confirm"
                    style={{ background: confirmColor }}
                    onClick={() => { onConfirm(); onClose(); }}
                >
                    {confirmText}
                </button>
            </div>
        </Modal>
    );
}

export default ModalConfirm;