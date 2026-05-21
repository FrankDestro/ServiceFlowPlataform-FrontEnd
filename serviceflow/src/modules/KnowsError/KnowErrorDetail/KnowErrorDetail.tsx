import { format, parseISO } from "date-fns";
import * as functions from "../../../utils/helpers/functions.ts";
import "./KnowErrorDetail.css";
import useKnowErrorDetail from "../hooks/useKnowErrorDetail.tsx";
import type { AttachmentDTO } from "../../Attachment/models/AttachmentDTO.ts";
import { FiDownload } from "react-icons/fi";
import { useAttachmentDownload } from "../../Attachment/hooks/useAttachmentDownload.tsx";
import NoData from "../../../components/UI/NoData/NoData.tsx";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import * as KnowErrorService from "../services/knowError-service.ts"

type Props = {
    id: number;
};

function KnowErrorDetail({ id }: Props) {

    const { data: knowError, isLoading, error } = useKnowErrorDetail(id);

    const { download } = useAttachmentDownload();

    useEffect(() => {
        KnowErrorService.incrementViewsKnowErrorRequest(id);
    }, [id]);

    if (isLoading) return <p>Carregando...</p>;
    if (error || !knowError) return <p>Erro ao carregar</p>;

    return (
        <div className="ke-detail-container">

            {/* Header */}
            <div className="ke-detail-header">
                <div className="ke-detail-top">
                    <span className="ke-detail-id">#{knowError.id}</span>
                    <span style={functions.getStatusKnowErrorsBadgeStyle(knowError.status)}>
                        {knowError.status}
                    </span>
                    {knowError.originTicketNumber && (
                        <span className="ke-detail-pill">
                            🎫 {knowError.originTicketNumber}
                        </span>
                    )}
                </div>
                <div className="ke-detail-title">{knowError.title}</div>

                {/* Tags */}
                <div className="ke-detail-tags">
                    {knowError.tags?.map((tag: string, i: number) => (
                        <span key={i} className="tag-td">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Informações */}
            <div className="ke-detail-card">
                <span className="ke-detail-section-title">INFORMAÇÕES</span>

                <div className="ke-detail-row">
                    <span className="ke-detail-label">Recursos Afetados</span>
                    <span className="ke-detail-value">{knowError.affectedSystems ?? "—"}</span>
                </div>
                <div className="ke-detail-row">
                    <span className="ke-detail-label">Criado por</span>
                    <span className="ke-detail-value">{knowError.registratorUserEmail}</span>
                </div>
                <div className="ke-detail-row">
                    <span className="ke-detail-label">Resolvido por</span>
                    <span className="ke-detail-value">{knowError.resolverUserEmail ?? "—"}</span>
                </div>
                <div className="ke-detail-row">
                    <span className="ke-detail-label">Data de criação</span>
                    <span className="ke-detail-value">
                        {format(parseISO(knowError.createDate), "dd/MM/yyyy HH:mm")}
                    </span>
                </div>
                <div className="ke-detail-row">
                    <span className="ke-detail-label">Última atualização</span>
                    <span className="ke-detail-value">
                        {format(parseISO(knowError.updatedAt), "dd/MM/yyyy HH:mm")}
                    </span>
                </div>
                <div className="ke-detail-row">
                    <span className="ke-detail-label">Data de resolução</span>
                    <span className="ke-detail-value">
                        {knowError.resolutionDate
                            ? format(parseISO(knowError.resolutionDate), "dd/MM/yyyy HH:mm")
                            : "—"}
                    </span>
                </div>
                <div className="ke-detail-row">
                    <span className="ke-detail-label">Visualizações</span>
                    <span className="ke-detail-value">{knowError.viewsCount}</span>
                </div>
                <div className="ke-detail-row">
                    <span className="ke-detail-label">Útil</span>
                    <span className="ke-detail-value">{knowError.helpfulCount}</span>
                </div>
            </div>

            {/* Descrição */}
            {knowError.description && (
                <div className="ke-detail-card">
                    <span className="ke-detail-section-title">DESCRIÇÃO</span>
                    <p className="ke-detail-text">{knowError.description}</p>
                </div>
            )}

            {/* Causa Raiz */}
            {knowError.rootCause && (
                <div className="ke-detail-card">
                    <span className="ke-detail-section-title">CAUSA RAIZ</span>
                    <p className="ke-detail-text">{knowError.rootCause}</p>
                </div>
            )}

            {/* Solução */}
            {knowError.solution && (
                <div className="ke-detail-card">
                    <span className="ke-detail-section-title">SOLUÇÃO</span>
                    <p className="ke-detail-text">{knowError.solution}</p>
                </div>
            )}

            {/* Workaround */}
            {knowError.workaround && (
                <div className="ke-detail-card">
                    <span className="ke-detail-section-title">WORKAROUND</span>
                    <p className="ke-detail-text">{knowError.workaround}</p>
                </div>
            )}

            {/* Anexos */}
            {knowError.attachments?.length > 0 ? (
                <div className="ke-detail-card">
                    <span className="ke-detail-section-title">ANEXOS</span>
                    <div className="ke-detail-attachments">
                        {knowError.attachments.map((att: AttachmentDTO) => (
                            <div key={att.id} className="ke-detail-attachment-chip">
                                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    📎 {att.originalName}
                                </span>
                                <span className="ke-detail-attachment-size">{att.sizeInMb} MB</span>
                                <div className="anx-download"
                                    onClick={() => download({ bucket: att.bucket, objectName: att.objectName })}
                                >
                                    <FiDownload size={15} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="ke-detail-card">
                    <span className="ke-detail-section-title">ANEXOS</span>
                    <NoData icon={faPaperclip} message="Nenhum anexo disponível" />

                </div>
            )}
        </div>
    );
}

export default KnowErrorDetail;