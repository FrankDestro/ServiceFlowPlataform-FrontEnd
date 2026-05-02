import InputCustom from "../../../components/form/InputCustom/InputCustom.tsx";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect.tsx";
import Button from "../../../components/UI/Button/Button.tsx";
import TiptapEditor from "../../../components/form/TiptapEditor/TiptapEditor.tsx";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import useKnowledgeBaseUpdateForm from "../hooks/useKnowledgeBaseUpdateForm.tsx";
import useKnowledgeBaseActions from "../hooks/useKnowledgeBaseActions.tsx";
import type { KnowledgeBaseDTO } from "../models/knowledgeBaseDTO.ts";
import "../KnowledgeBaseCreateForm/KnowledgeBaseCreateForm.css";
import useKnowledgeBaseCategories from "../hooks/useKnowledgeBaseCategories.tsx";

type Props = {
    article: KnowledgeBaseDTO;
    onSuccess: () => void;
    formRef: React.RefObject<HTMLFormElement | null>;
};

function KnowledgeBaseUpdateForm({ article, onSuccess, formRef }: Props) {
    const {
        formData,
        handleChange,
        handleSubmit,
        handleContentChange,
        words,
        inputValue,
        setInputValue,
        handleKeyDown,
        handleRemoveWord,
    } = useKnowledgeBaseUpdateForm(article, onSuccess);

    const { changeStatus, archive, isArchiving } = useKnowledgeBaseActions(article.id, onSuccess);

    const { data: categories, isLoading: loadingCategories } = useKnowledgeBaseCategories();


    return (
        <form ref={formRef} onSubmit={handleSubmit} className="kb-form-container">

            <InputCustom label="Título" name="title" value={formData.title} onChange={handleChange} />

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
                            <button type="button" onClick={() => handleRemoveWord(word)} className="kb-remove-word-button">
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="kb-editor-placeholder">
                <label className="kb-editor-label ">Conteúdo</label>
                <TiptapEditor
                    content={formData.content}
                    onChange={handleContentChange}
                />
            </div>

            {/* Status + Arquivar */}
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                    <CustomSelect
                        label="Status"
                        value={article.status}
                        onChange={(e) => changeStatus(e.target.value)}
                        options={[
                            { value: "DRAFT", label: "Draft" },
                            { value: "PUBLISHED", label: "Published" },
                            { value: "ARCHIVED", label: "Archived" },
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

export default KnowledgeBaseUpdateForm;