import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as knowErrorService from "../services/knowError-service.ts";
import type { KnowErrorDTO } from "../models/knowErrorDTO.ts";

export type KnowErrorUpdateDTO = {
    title: string;
    description: string;
    rootCause: string;
    solution: string;
    workaround: string;
    affectedSystems: string;
    tags: string[];
};

function useKnowErrorUpdateForm(knowError: KnowErrorDTO, onSuccess: () => void) {
    const queryClient = useQueryClient();
    const [words, setWords] = useState<string[]>(knowError.tags ?? []);
    const [inputValue, setInputValue] = useState("");

    const [formData, setFormData] = useState<KnowErrorUpdateDTO>({
        title: knowError.title,
        description: knowError.description,
        rootCause: knowError.rootCause,
        solution: knowError.solution,
        workaround: knowError.workaround,
        affectedSystems: knowError.affectedSystems,
        tags: knowError.tags,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: KnowErrorUpdateDTO) =>
            knowErrorService.updateKnowErrorRequest(knowError.id, { ...data, tags: words }),
        onSuccess: () => {
            toast.success("KnowError atualizado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["know-error"] });
            setTimeout(() => onSuccess(), 500);
        },
        onError: () => {
            toast.error("Erro ao atualizar KnowError.");
        }
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        if (!formData.description.trim()) { toast.error("Informe a descrição."); return false; }
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
        isLoading: isPending,
        words,
        inputValue,
        setInputValue,
        handleKeyDown,
        handleRemoveWord,
    };
}

export default useKnowErrorUpdateForm;