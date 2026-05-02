import InputCustom from "../../../components/form/InputCustom/InputCustom.tsx";
import CustomTextarea from "../../../components/form/CustomTextarea/CustomTextarea.tsx";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect.tsx";
import Button from "../../../components/UI/Button/Button.tsx";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import useKnowErrorUpdateForm from "../hooks/useKnowErrorUpdateForm.tsx";
import useKnowErrorActions from "../hooks/useKnowErrorActions.tsx";
import type { KnowErrorDTO } from "../models/knowErrorDTO.ts";

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
    } = useKnowErrorUpdateForm(knowError, onSuccess);

    const { changeStatus, archive, isArchiving } = useKnowErrorActions(knowError.id, onSuccess);

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

            {/* Status + Arquivar */}
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
                <Button
                    text="Arquivar"
                    icon={faBoxArchive}
                    background="#fee2e2"
                    hoverColor="#fecaca"
                    color="#dc2626"
                    type="button"
                    borderRadius="5px"
                    isLoading={isArchiving}
                    onClick={() => archive()}
                />
            </div>
        </form>
    );
}

export default KnowErrorUpdateForm;