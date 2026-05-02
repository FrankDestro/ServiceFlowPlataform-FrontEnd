import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./SearchFilterKnowledgeBase.css";
import Button from "../../../../components/UI/Button/Button.tsx";
import useKnowledgeBaseCategories from "../../hooks/useKnowledgeBaseCategories.tsx";
import type { KnowledgeBaseCategoryDTO } from "../../models/knowledgeBaseDTO.ts";

type Props = {
    onSearch: (formData: {
        title: string;
        categoryId: number | null;
        status: string;
        tags: string;
    }) => void;
};

function SearchFilterKnowledgeBase({ onSearch }: Props) {
    const [filters, setFilters] = useState({
        title: "",
        categoryId: null as number | null,
        status: "",
    });

    const [words, setWords] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const { data: categories } = useKnowledgeBaseCategories();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: name === "categoryId" ? (value ? Number(value) : null) : value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch({ ...filters, tags: words.join(",") });
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === " ") {
            e.preventDefault();
            const trimmed = inputValue.trim();
            if (trimmed && !words.includes(trimmed)) {
                setWords(prev => [...prev, trimmed]);
                setInputValue("");
            }
        }
    }

    function handleRemoveWord(word: string) {
        setWords(words.filter(w => w !== word));
    }

    function handleClearFilters() {
        setFilters({ title: "", categoryId: null, status: "" });
        setWords([]);
        onSearch({ title: "", categoryId: null, status: "", tags: "" });
    }

    return (
        <div className="kb-search-card">
            <form onSubmit={handleSubmit}>
                <div className="kb-search-container">
                    <div className="kb-search-row">
                        <div className="kb-input-container">
                            <input
                                type="text"
                                placeholder=" "
                                name="title"
                                value={filters.title}
                                onChange={handleInputChange}
                                className="kb-floating-input"
                            />
                            <label className="kb-floating-label">Título</label>
                        </div>

                        <div className="kb-select-container">
                            <select
                                name="categoryId"
                                value={filters.categoryId ?? ""}
                                onChange={handleInputChange}
                                className="kb-select"
                            >
                                <option value="">Todas as categorias</option>
                                {(categories ?? []).map((cat: KnowledgeBaseCategoryDTO) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="kb-select-container">
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleInputChange}
                                className="kb-select"
                            >
                                <option value="">Todos os status</option>
                                <option value="DRAFT">DRAFT</option>
                                <option value="PUBLISHED">PUBLISHED</option>
                                <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                        </div>
                    </div>

                    <div className="kb-search-row">
                        <div className="kb-word-input-container">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tags (pressione Espaço para adicionar)"
                                className="kb-word-input"
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

                        <div className="kb-search-buttons">
                            <Button
                                text="Filtrar"
                                icon={faFilter}
                                background="#0f766e"
                                hoverColor="#0d9488"
                                type="submit"
                                borderRadius="5px"
                                size="small"
                            />
                            <div onClick={handleClearFilters}>
                                <Button
                                    text="Limpar"
                                    icon={faEraser}
                                    background="#0f766e"
                                    hoverColor="#0d9488"
                                    borderRadius="5px"
                                    size="small"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchFilterKnowledgeBase;