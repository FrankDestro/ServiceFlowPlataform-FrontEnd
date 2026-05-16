import AnexosList from "../../components/AnexosList";
import AnexoUpload from "../../components/AnexoUpload";
import { useAttachment } from "../../hooks/useAttachament";

type Props = {
    entityType: string;
    entityId: string;
    isReadOnly: boolean;
    readOnlyMessage?: string;
};

function AnexoTabGeral({ entityType, entityId, isReadOnly, readOnlyMessage }: Props) {

    const { attachments } = useAttachment(entityType, entityId);

    return (
        <div className="anx-wrap">
            <AnexosList anexos={attachments} isLoading={false} />
            {isReadOnly ? (
                <div className="at-blocked-msg">
                    🚫 {readOnlyMessage ?? "Não é possível adicionar anexos"}
                </div>
            ) : (
                <AnexoUpload entityType={entityType} id={entityId} />
            )}
        </div>
    );
}

export default AnexoTabGeral;