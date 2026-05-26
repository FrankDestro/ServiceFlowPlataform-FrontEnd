import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../components/UI/ModalDefault/Modal";
import { useState } from "react";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { getFileType } from "../../../utils/helpers/functions";
import { useAttachmentUpload } from "../hooks/useAttachmentUpload";

type Props = {
    entityType: string;
    id: string;
};

function AnexoUpload({ entityType, id }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { upload, isUploading } = useAttachmentUpload(entityType, id);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) { alert("Selecione um arquivo antes de salvar."); return; }
        const fileType = getFileType(selectedFile.type);

        if (!fileType) { alert("Tipo de arquivo inválido."); return; }

        upload(
            { file: selectedFile, originalName: selectedFile.name },
            {
                onSuccess: () => {
                    setShowModal(false);
                    setSelectedFile(null);
                }
            }
        );
    };

    return (
        <>
            <button className="anx-btn-add" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPaperclip} style={{ fontSize: 11 }} />
                Adicionar anexo
            </button>

            <Modal
                title="Anexar um documento"
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                footer={
                    <button
                        onClick={handleUpload}
                        className="anx-btn-save"
                        disabled={isUploading}
                    >
                        {isUploading ? "Enviando..." : "Salvar arquivo"}
                    </button>
                }
            >
                <div className="anx-upload-area">
                    <FontAwesomeIcon icon={faPaperclip} style={{ fontSize: 28, color: "#94a3b8" }} />
                    <div className="anx-upload-label">
                        {selectedFile ? selectedFile.name : "Clique para selecionar um arquivo"}
                    </div>
                    <div className="anx-upload-hint">.pdf, .jpg, .png</div>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={handleFileChange}
                        className="anx-upload-input"
                    />
                </div>
            </Modal>
        </>
    )
}

export default AnexoUpload
