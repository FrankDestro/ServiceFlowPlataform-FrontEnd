import { useState } from "react";
import Modal from "react-modal";
import "./ModalAnnotation.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
};

function ModalAnnotation({ isOpen, onClose, onConfirm }: Props) {
    const [reason, setReason] = useState("");

    function handleConfirm() {
        if (!reason.trim()) return;
        onConfirm(reason);
        setReason("");
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Motivo"
            overlayClassName="modal-annotation-overlay"
            className="modal-annotation-content"
        >
            <h2 className="modal-annotation-title">Informe o motivo</h2>
            <textarea
                className="modal-annotation-textarea"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Descreva o motivo..."
                rows={4}
            />
            <div className="modal-annotation-footer">
                <button className="modal-annotation-cancel" onClick={onClose}>Cancelar</button>
                <button className="modal-annotation-confirm" onClick={handleConfirm}>Confirmar</button>
            </div>
        </Modal>
    );
}

export default ModalAnnotation;