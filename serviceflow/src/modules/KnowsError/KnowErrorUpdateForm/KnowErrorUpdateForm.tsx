import InputCustom from "../../../components/form/InputCustom/InputCustom.tsx";
import CustomTextarea from "../../../components/form/CustomTextarea/CustomTextarea.tsx";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect.tsx";
import useKnowErrorUpdateForm from "../hooks/useKnowErrorUpdateForm.tsx";
import useKnowErrorActions from "../hooks/useKnowErrorActions.tsx";
import type { KnowErrorDTO } from "../models/knowErrorDTO.ts";
import { useAttachmentDownload } from "../../Attachment/hooks/useAttachmentDownload.tsx";
import type { AttachmentDTO } from "../../Attachment/models/AttachmentDTO.ts";
import { FiDownload } from "react-icons/fi";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../../components/UI/NoData/NoData.tsx";
import CustomUploadFile from "../../../components/form/CustomUploadFile/CustomUploadFile.tsx";

type Props = {
    knowError: KnowErrorDTO;
    onSuccess: () => void;
    formRef: React.RefObject<HTMLFormElement | null>;
};

function KnowErrorUpdateForm({ knowError, onSuccess, formRef }: Props) {
    const {
        formData,
        handleChange,
        handleSubmit,
        words,
        inputValue,
        setInputValue,
        handleKeyDown,
        handleRemoveWord,
        attachedFiles,
        setAttachedFiles,
    } = useKnowErrorUpdateForm(knowError, onSuccess);

    const { changeStatus } = useKnowErrorActions(knowError.id, onSuccess);

    const { download } = useAttachmentDownload();

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="ke-form-container">

            <InputCustom label="Título" name="title" value={formData.title} onChange={handleChange} />
            <InputCustom label="Recursos Afetados" name="affectedSystems" value={formData.affectedSystems} onChange={handleChange} />

            <div className="ke-tags-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tags (pressione Espaço para adicionar)"
                    className="floating-input"
                />
                <div className="word-list">
                    {words.map((word, index) => (
                        <div key={index} className="word-chip">
                            {word}
                            <button type="button" onClick={() => handleRemoveWord(word)} className="remove-word-button">
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <CustomTextarea label="Descrição" name="description" value={formData.description} onChange={handleChange} rows={3} />
            <CustomTextarea label="Causa Raiz" name="rootCause" value={formData.rootCause} onChange={handleChange} rows={3} />
            <CustomTextarea label="Solução" name="solution" value={formData.solution} onChange={handleChange} rows={3} />
            <CustomTextarea label="Workaround" name="workaround" value={formData.workaround} onChange={handleChange} rows={3} />

            {/* Status */}
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                    <CustomSelect
                        label="Status"
                        value={knowError.status}
                        onChange={(e) => changeStatus(e.target.value)}
                        options={[
                            { value: "OPEN", label: "OPEN" },
                            { value: "UNDER_ANALYSIS", label: "UNDER_ANALYSIS" },
                            { value: "DOCUMENTED", label: "DOCUMENTED" },
                            { value: "SOLUTION_PENDING", label: "SOLUTION_PENDING" },
                            { value: "RESOLVED", label: "RESOLVED" },
                        ]}
                    />
                </div>
            </div>


            {/* Anexos */}
            {knowError.attachments?.length > 0 ? (
                <div className="ke-detail-card">
                    <span className="ke-detail-section-title">ANEXOS</span>
                    <div className="ke-detail-attachments">
                        {knowError.attachments.map((att: AttachmentDTO) => (
                            <div key={att.id} className="ke-detail-attachment-chip">
                                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    📎 {att.originalName}
                                </span>
                                <span className="ke-detail-attachment-size">{att.sizeInMb} MB</span>
                                <div className="anx-download"
                                    onClick={() => download({ bucket: att.bucket, objectName: att.objectName })}
                                >
                                    <FiDownload size={15} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="ke-detail-card">
                    <span className="ke-detail-section-title">ANEXOS</span>
                    <NoData icon={faPaperclip} message="Nenhum anexo disponível" />

                </div>
            )}

            <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", margin: "12px 0 2px" }}>
                Adicionar novos
            </div>

            {/* Anexos */}
            <CustomUploadFile
                files={attachedFiles}
                onFilesChange={setAttachedFiles}
            />


        </form>
    );
}

export default KnowErrorUpdateForm;