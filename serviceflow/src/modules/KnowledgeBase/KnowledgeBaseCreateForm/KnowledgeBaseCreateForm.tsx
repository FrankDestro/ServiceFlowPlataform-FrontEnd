// KnowledgeBaseCreateForm.tsx
import InputCustom from "../../../components/form/InputCustom/InputCustom.tsx";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect.tsx";
import Button from "../../../components/UI/Button/Button.tsx";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useKnowledgeBaseCreateForm from "../hooks/useKnowledgeBaseCreateForm.tsx";
import "./KnowledgeBaseCreateForm.css";
import TiptapEditor from "../../../components/form/TiptapEditor/TiptapEditor.tsx";
import useKnowledgeBaseCategories from "../hooks/useKnowledgeBaseCategories.tsx";

type Props = {
    onSuccess: () => void;
    onReload: () => void;
};

function KnowledgeBaseCreateForm({ onSuccess, onReload }: Props) {
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
        handleContentChange,
    } = useKnowledgeBaseCreateForm(() => {
        onSuccess();
        onReload();
    });

    const { data: categories, isLoading: loadingCategories } = useKnowledgeBaseCategories();

    return (
        <form onSubmit={handleSubmit} className="kb-form-container">

            <InputCustom
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />

            <div className="kb-form-row">

                <CustomSelect
                    label="Categoria"
                    name="categoryId"
                    value={String(formData.categoryId ?? "")}
                    onChange={handleChange}
                    options={
                        loadingCategories
                            ? [{ value: "", label: "Carregando..." }]
                            : (categories ?? []).map((cat: any) => ({
                                value: String(cat.id),
                                label: cat.name,
                            }))
                    }
                />

                <CustomSelect
                    label="Visibilidade"
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    options={[
                        { value: "INTERNO", label: "Interno" },
                        { value: "PUBLICO", label: "Público" },
                    ]}
                />
            </div>

            {/* Tags */}
            <div className="kb-tags-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tags (pressione Espaço para adicionar)"
                    className="kb-floating-input"
                />
                <div className="kb-word-list">
                    {words.map((word, index) => (
                        <div key={index} className="kb-word-chip">
                            {word}
                            <button
                                type="button"
                                onClick={() => handleRemoveWord(word)}
                                className="kb-remove-word-button"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Conteúdo - por enquanto textarea, depois Tiptap */}
            <div className="kb-editor-placeholder">
                <label className="kb-editor-label">Conteúdo</label>
                <TiptapEditor
                    content={formData.content}
                    onChange={handleContentChange}
                />
            </div>

            <div className="kb-form-footer">
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

export default KnowledgeBaseCreateForm;