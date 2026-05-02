import useKnowledgeBaseDetail from "../hooks/useKnowledgeBaseDetail.tsx";
import KnowledgeBaseUpdateForm from "../KnowledgeBaseUpdateForm/KnowledgeBaseUpdateForm.tsx";

type Props = {
    id: number;
    onSuccess: () => void;
    formRef: React.RefObject<HTMLFormElement | null>;
};

function KnowledgeBaseEditWrapper({ id, onSuccess, formRef }: Props) {
    const { data: article, isLoading, error } = useKnowledgeBaseDetail(id);

    if (isLoading) return <p>Carregando...</p>;
    if (error || !article) return <p>Erro ao carregar</p>;

    return (
        <KnowledgeBaseUpdateForm
            article={article}
            onSuccess={onSuccess}
            formRef={formRef}
        />
    );
}

export default KnowledgeBaseEditWrapper;