import { useState } from "react";
import { toast } from "react-toastify";
import * as knowErrorService from "../services/knowError-service.ts";
import * as attachmentService from "../../Attachment/service/attachment-service.ts"

type FormData = {
    title: string;
    description: string;
    rootCause: string;
    solution: string;
    workaround: string;
    affectedSystems: string;
    status: string;
};

function useKnowErrorForm(onSuccess: () => void) {
    const [isLoading, setIsLoading] = useState(false);
    const [words, setWords] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);


    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        rootCause: "",
        solution: "",
        workaround: "",
        affectedSystems: "",
        status: "OPEN",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
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
        if (!formData.status) { toast.error("Selecione o status."); return false; }
        return true;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        const toastId = toast.loading("Salvando...");

        knowErrorService
            .createKnowErrorRequest({
                ...formData,
                tags: words,
            })
            .then(async (response) => {
                const knowErrorId = response.data.id;

                if (attachedFiles.length > 0) {
                    const uploads = attachedFiles.map((file) => {
                        const data = new FormData();
                        data.append("file", file);
                        data.append("originalName", file.name);
                        data.append("entityType", "KNOW_ERROR")
                        data.append("entityId", String(knowErrorId));
                        return attachmentService.uploadAnexos(data);
                    });
                    await Promise.all(uploads);
                }

                toast.update(toastId, {
                    render: "KnowError criado com sucesso!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                setTimeout(() => onSuccess(), 500);
            })
            .catch(() => {
                toast.update(toastId, {
                    render: "Erro ao criar KnowError.",
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
        attachedFiles,
        setAttachedFiles,
    };
}

export default useKnowErrorForm;