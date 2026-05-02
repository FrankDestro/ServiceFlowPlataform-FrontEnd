import useKnowErrorDetail from "../hooks/useKnowErrorDetail";
import KnowErrorUpdateForm from "../KnowErrorUpdateForm/KnowErrorUpdateForm";

type Props = {
    id: number;
    onSuccess: () => void;
    formRef: React.RefObject<HTMLFormElement | null>;
};

function KnowErrorEditWrapper({ id, onSuccess, formRef }: Props) {
    const { data: knowError, isLoading, error } = useKnowErrorDetail(id);

    if (isLoading) return <p>Carregando...</p>;
    if (error || !knowError) return <p>Erro ao carregar</p>;

    return (
        <KnowErrorUpdateForm
            knowError={knowError}
            onSuccess={onSuccess}
            formRef={formRef}
        />
    );
}

export default KnowErrorEditWrapper;
