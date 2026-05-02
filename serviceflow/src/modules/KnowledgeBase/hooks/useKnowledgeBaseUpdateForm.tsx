import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as knowledgeBaseService from "../service/knowledgeBase-service.ts";
import type { KnowledgeBaseDTO } from "../models/knowledgeBaseDTO.ts";

export type KnowledgeBaseUpdateDTO = {
    title: string;
    content: string;
    categoryId: number | null;
    visibility: string;
    tags: string[];
};

function useKnowledgeBaseUpdateForm(article: KnowledgeBaseDTO, onSuccess: () => void) {
    const queryClient = useQueryClient();
    const [words, setWords] = useState<string[]>(article.tags ?? []);
    const [inputValue, setInputValue] = useState("");

    const [formData, setFormData] = useState<KnowledgeBaseUpdateDTO>({
        title: article.title,
        content: article.content,
        categoryId: article.categoryId,
        visibility: article.visibility,
        tags: article.tags,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: KnowledgeBaseUpdateDTO) =>
            knowledgeBaseService.updateKnowledgeBaseRequest(article.id, { ...data, tags: words }),
        onSuccess: () => {
            toast.success("Artigo atualizado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["knowledge-base"] });
            setTimeout(() => onSuccess(), 500);
        },
        onError: () => {
            toast.error("Erro ao atualizar artigo.");
        }
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "categoryId" ? Number(value) : value,
        }));
    }

    function handleContentChange(value: string) {
        setFormData(prev => ({ ...prev, content: value }));
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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;
        mutate(formData);
    }

    return {
        formData,
        handleChange,
        handleSubmit,
        handleContentChange,
        isLoading: isPending,
        words,
        inputValue,
        setInputValue,
        handleKeyDown,
        handleRemoveWord,
    };
}

export default useKnowledgeBaseUpdateForm;