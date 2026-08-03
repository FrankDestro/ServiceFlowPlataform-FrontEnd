import { format, parseISO } from "date-fns";
import "./KnowledgeBaseDetail.css";
import useKnowledgeBaseDetail from "../hooks/useKnowledgeBaseDetail.tsx";
import { useEffect } from "react";
import * as KnowledgeBaseService from "../service/knowledgeBase-service.ts";
import TiptapEditor from "../../../components/form/TiptapEditor/TiptapEditor.tsx";
import * as functions from "../../../utils/helpers/functions.ts"

type Props = {
    id: number;
};

function KnowledgeBaseDetail({ id }: Props) {
    const { data: article, isLoading, error } = useKnowledgeBaseDetail(id);

    useEffect(() => {
        KnowledgeBaseService.incrementViewsKnowledgeBaseRequest(id);
    }, [id]);

    if (isLoading) return <p>Carregando...</p>;
    if (error || !article) return <p>Erro ao carregar</p>;

    return (
        <div className="kb-detail-container">

            {/* Header */}
            <div className="kb-detail-header">
                <div className="kb-detail-top">
                    <span className="kb-detail-id">#{article.id}</span>
                    <span className="kb-detail-category">{article.categoryName}</span>
                    <span className={`kb-detail-visibility ${article.visibility === "PUBLICO" ? "public" : "internal"}`}>
                        {article.visibility === "PUBLICO" ? "🌐 Público" : "🔒 Interno"}
                    </span>
                </div>
                <div className="kb-detail-title">{article.title}</div>
                <div className="kb-detail-tags">
                    {article.tags?.map((tag: string, i: number) => (
                        <span key={i} className="kb-tag-td">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Informações */}
            <div className="kb-detail-card">
                <span className="kb-detail-section-title">INFORMAÇÕES</span>
                <div className="kb-detail-row">
                    <span className="kb-detail-label">Criado por</span>
                    <span className="kb-detail-value">{article.createdByEmail}</span>
                </div>
                <div className="kb-detail-row">
                    <span className="kb-detail-label">Data de criação</span>
                    <span className="kb-detail-value">{format(parseISO(article.createdAt), "dd/MM/yyyy HH:mm")}</span>
                </div>
                <div className="kb-detail-row">
                    <span className="kb-detail-label">Última atualização</span>
                    <span className="kb-detail-value">{format(parseISO(article.updatedAt), "dd/MM/yyyy HH:mm")}</span>
                </div>
                <div className="kb-detail-row">
                    <span className="kb-detail-label">Visualizações</span>
                    <span className="kb-detail-value" style={{ color: "#6366f1", fontWeight: 600 }}>{article.viewsCount}</span>
                </div>
                <div className="kb-detail-row">
                    <span className="kb-detail-label">Útil</span>
                    <span className="kb-detail-value" style={{ color: "#16a34a", fontWeight: 600 }}>{article.helpfulCount}</span>
                </div>
                <div className="kb-detail-row">
                    <span className="kb-detail-label">Status</span>
                    <span className="kb-detail-value" style={functions.getStatusKnowledgeBadgeStyle(article.status)}>{article.status}</span>
                </div>
            </div>

            {/* Conteúdo com Tiptap em modo leitura */}
            <div className="kb-detail-card">
                <span className="kb-detail-section-title">CONTEÚDO</span>
                <TiptapEditor
                    content={article.content}
                    onChange={() => { }}
                    editable={false}
                    scrollable={true}
                />
            </div>
        </div>
    );
}

export default KnowledgeBaseDetail;