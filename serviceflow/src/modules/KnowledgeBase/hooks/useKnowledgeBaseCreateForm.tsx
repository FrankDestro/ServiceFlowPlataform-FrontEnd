import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as knowledgeBaseService from "../service/knowledgeBase-service.ts";

type FormData = {
    title: string;
    content: string;
    categoryId: number | null;
    visibility: string;
};

function useKnowledgeBaseCreateForm(onSuccess: () => void) {
    const [isLoading, setIsLoading] = useState(false);
    const [words, setWords] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const [formData, setFormData] = useState<FormData>({
        title: "",
        content: "",
        categoryId: null,
        visibility: "INTERNO",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "categoryId" ? Number(value) : value,
        }));
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
        setWords(prev => prev.filter(w => w !== word));
    }

    function validate(): boolean {
        if (!formData.title.trim()) { toast.error("Informe o título."); return false; }
        if (!formData.content.trim()) { toast.error("Informe o conteúdo."); return false; }
        if (!formData.categoryId) { toast.error("Informe a categoria."); return false; }
        return true;
    }

    function handleContentChange(value: string) {
        setFormData(prev => ({ ...prev, content: value }));
        localStorage.setItem('kb-draft', JSON.stringify({ ...formData, content: value }));
    }

    useEffect(() => {
        const draft = localStorage.getItem('kb-draft');
        if (draft) {
            setFormData(JSON.parse(draft));
        }
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        const toastId = toast.loading("Salvando...");

        knowledgeBaseService
            .createKnowledgeBaseRequest({
                ...formData,
                tags: words,
                status: "DRAFT",
            })
            .then(() => {
                toast.update(toastId, {
                    render: "Artigo criado com sucesso!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                localStorage.removeItem('kb-draft');
                setTimeout(() => onSuccess(), 500);
            })
            .catch(() => {
                toast.update(toastId, {
                    render: "Erro ao criar artigo.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            })
            .finally(() => setIsLoading(false));
    }

    return {
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
    };
}

export default useKnowledgeBaseCreateForm;111111111