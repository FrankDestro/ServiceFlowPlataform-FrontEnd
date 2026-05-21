import InputCustom from "../../../components/form/InputCustom/InputCustom.tsx";
import CustomTextarea from "../../../components/form/CustomTextarea/CustomTextarea.tsx";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect.tsx";
import useKnowErrorForm from "../hooks/useKnowErrorForm.tsx";
import "./KnowErrorCreateForm.css";
import CustomUploadFile from "../../../components/form/CustomUploadFile/CustomUploadFile.tsx";


type Props = {
    onSuccess: () => void;
    onReload: () => void;
    newFormRef: React.RefObject<HTMLFormElement | null>
};

function KnowErrorCreateForm({ onSuccess, onReload, newFormRef }: Props) {
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
        <form ref={newFormRef} onSubmit={handleSubmit} className="ke-form-container">
            {/* Título */}
            <InputCustom
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
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

            {/* Status */}
            <CustomSelect
                label="Status"
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

            {/* Anexos */}
            <CustomUploadFile
                files={attachedFiles}
                onFilesChange={setAttachedFiles}
            />

        </form>
    );
}

export default KnowErrorCreateForm;