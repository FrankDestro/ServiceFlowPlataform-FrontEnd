import InputCustom from "../../../components/form/InputCustom/InputCustom.tsx";
import CustomTextarea from "../../../components/form/CustomTextarea/CustomTextarea.tsx";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect.tsx";
import Button from "../../../components/UI/Button/Button.tsx";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useKnowErrorForm from "../hooks/useKnowErrorForm.tsx";
import "./KnowErrorCreateForm.css";
import CustomUploadFile from "../../../components/form/CustomUploadFile/CustomUploadFile.tsx";


type Props = {
    onSuccess: () => void;
    onReload: () => void;
};

function KnowErrorCreateForm({ onSuccess, onReload }: Props) {
    const {
        formData,
        handleChange,
        handleSubmit,
        isLoading,
        words,
        inputValue,
        setInputValue,
        handleKeyDown,
        handleRemoveWord,
        attachedFiles,
        setAttachedFiles } = useKnowErrorForm(() => {
            onSuccess();
            onReload();
        });

    return (
        <form onSubmit={handleSubmit} className="ke-form-container">
            {/* Título */}
            <InputCustom
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />

            {/* Status */}
            <CustomSelect
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                    { value: "OPEN", label: "OPEN" },
                    { value: "UNDER_ANALYSIS", label: "UNDER_ANALYSIS" },
                    { value: "DOCUMENTED", label: "DOCUMENTED" },
                    { value: "SOLUTION_PENDING", label: "SOLUTION_PENDING" },
                    { value: "RESOLVED", label: "RESOLVED" },
                ]}
            />

            {/* Recursos Afetados */}
            <InputCustom
                label="Recursos Afetados"
                name="affectedSystems"
                value={formData.affectedSystems}
                onChange={handleChange}
            />

            {/* Tags */}
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
                            <button
                                type="button"
                                onClick={() => handleRemoveWord(word)}
                                className="remove-word-button"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Descrição */}
            <CustomTextarea
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
            />

            {/* Causa Raiz */}
            <CustomTextarea
                label="Causa Raiz"
                name="rootCause"
                value={formData.rootCause}
                onChange={handleChange}
                rows={3}
            />

            {/* Solução */}
            <CustomTextarea
                label="Solução"
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                rows={3}
            />

            {/* Workaround */}
            <CustomTextarea
                label="Workaround"
                name="workaround"
                value={formData.workaround}
                onChange={handleChange}
                rows={3}
            />

            <CustomUploadFile
                files={attachedFiles}
                onFilesChange={setAttachedFiles}
            />

            {/* Botão */}
            <div className="ke-form-footer">
                <Button
                    text="Salvar"
                    icon={faSave}
                    background="#0f766e"
                    hoverColor="#0d9488"
                    type="submit"
                    borderRadius="8px"
                    isLoading={isLoading}
                />
            </div>
        </form>
    );
}

export default KnowErrorCreateForm;