import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO } from "date-fns";
import { Eye, EyeIcon, PencilLine, ThumbsUp } from "lucide-react";
import SearchFilterKnowledgeBase from "../components/SearchFilterKnowledgeBase/SearchFilterKnowledgeBase.tsx";
import type { KnowledgeBaseSearchParams, KnowledgeBaseSimpleDTO } from "../models/knowledgeBaseDTO.ts";
import "./KnowledgeBaseListing.css";
import { useRef, useState } from "react";
import Button from "../../../components/UI/Button/Button.tsx";
import { faClose, faPlus, faSave, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/UI/ModalDefault/Modal.tsx";
import KnowledgeBaseCreateForm from "../KnowledgeBaseCreateForm/KnowledgeBaseCreateForm.tsx";
import KnowledgeBaseDetail from "../KnowledgeBaseDetail/KnowledgeBaseDetail.tsx";
import KnowledgeBaseEditWrapper from "../KnowledgeBaseEditWrapper/KnowledgeBaseEditWrapper.tsx";
import * as KnowledgeBaseService from "../service/knowledgeBase-service.ts";
import { toast } from "react-toastify";
import * as functions from "../../../utils/helpers/functions.ts"

type KnowledgeBaseListingProps = {
    articles: KnowledgeBaseSimpleDTO[];
    onSearch: (formData: KnowledgeBaseSearchParams) => void;
    onReload: () => void;
};

const KnowledgeBaseListing = ({ onSearch, articles, onReload }: KnowledgeBaseListingProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <div className="kb-container-base">
                <SearchFilterKnowledgeBase onSearch={onSearch} />
            </div>
            <div className="kb-container-btn-new">
                <Button
                    text="Adicionar novo"
                    icon={faPlus}
                    background="#0f766e"
                    hoverColor="#0d9488"
                    type="submit"
                    borderRadius="5px"
                    size="small"
                    onClick={() => setIsNewModalOpen(true)}
                />
            </div>
            <table className="kb-container-base">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Tags</th>
                        <th>Visibilidade</th>
                        <th>Status</th>
                        <th>Criado por</th>
                        <th>Criado em</th>
                        <th><EyeIcon size={14} /> Views</th>
                        <th><ThumbsUp size={14} /> Útil</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td className="kb-limited-text">{article.title}</td>
                            <td>{article.categoryName ?? "—"}</td>
                            <td>
                                <div className="kb-tag-list">
                                    {article.tags?.slice(0, 2).map((tag, index) => (
                                        <span key={index} className="kb-tag-td">{tag}</span>
                                    ))}
                                    {article.tags?.length > 2 && (
                                        <span className="kb-tag-td">+{article.tags.length - 2}</span>
                                    )}
                                </div>
                            </td>
                            <td>{article.visibility ?? "—"}</td>
                            <td>
                                <span style={functions.getStatusKnowledgeBadgeStyle(article.status)}>
                                    {article.status}
                                </span>
                            </td>
                            <td>{article.createdByEmail ?? "—"}</td>
                            <td>{format(parseISO(article.createdAt), "dd/MM/yyyy HH:mm")}</td>
                            <td style={{ textAlign: "center", color: "#6366f1", fontWeight: 600 }}>{article.viewsCount}</td>
                            <td style={{ textAlign: "center", color: "#16a34a", fontWeight: 600 }}>{article.helpfulCount}</td>
                            <td>
                                <div
                                    className="btn-action"
                                    onClick={() => {
                                        if (article.status === "ARCHIVED") return;
                                        setSelectedId(article.id);
                                        setIsEditModalOpen(true);
                                    }}
                                    style={{
                                        opacity: article.status === "ARCHIVED" ? 0.4 : 1,
                                        cursor: article.status === "ARCHIVED" ? "not-allowed" : "pointer"
                                    }}
                                >
                                    <PencilLine size={16} />
                                </div>
                                <div
                                    className="btn-action"
                                    onClick={() => {
                                        setSelectedId(article.id);
                                        setIsViewModalOpen(true);
                                    }}
                                >
                                    <Eye size={16} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Novo */}
            {isNewModalOpen && (
                <Modal
                    title="Novo Artigo"
                    isOpen={isNewModalOpen}
                    onClose={() => setIsNewModalOpen(false)}
                    width="1200px"
                    maxBodyHeight="120vh"
                >
                    <KnowledgeBaseCreateForm
                        onSuccess={() => setIsNewModalOpen(false)}
                        onReload={onReload}
                    />
                </Modal>
            )}

            {/* Modal Visualizar */}
            {isViewModalOpen && selectedId && (
                <Modal
                    title="Detalhes do Artigo"
                    isOpen={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setSelectedId(null);
                        onReload();
                    }}
                    width="1200px"
                    footer={
                        <>
                            <Button
                                text="Útil"
                                icon={faThumbsUp}
                                background="#f0fdf4"
                                hoverColor="#dcfce7"
                                color="#16a34a"
                                type="button"
                                borderRadius="5px"
                                onClick={() => {
                                    KnowledgeBaseService.markAsHelpfulKnowledgeBaseRequest(selectedId!)
                                        .then(() => toast.success("Marcado como útil! 👍"))
                                        .catch(() => toast.error("Erro ao marcar como útil."));
                                }}
                            />
                            <Button
                                text="Fechar"
                                icon={faClose}
                                background="#fee2e2"
                                hoverColor="#fecaca"
                                color="#dc2626"
                                type="button"
                                borderRadius="5px"
                                onClick={() => {
                                    setIsViewModalOpen(false);
                                    onReload();
                                }}
                            />
                        </>
                    }
                >
                    <div className="modal-scroll-content">
                        <KnowledgeBaseDetail id={selectedId} />
                    </div>
                </Modal>
            )}

            {/* Modal Editar */}
            {isEditModalOpen && selectedId && (
                <Modal
                    title="Editar Artigo"
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedId(null);
                    }}
                    width="1200px"
                    footer={
                        <>
                            <Button
                                text="Salvar Alterações"
                                icon={faSave}
                                background="#0f766e"
                                hoverColor="#0d9488"
                                type="button"
                                borderRadius="5px"
                                onClick={() => formRef.current?.requestSubmit()}
                            />
                            <Button
                                text="Cancelar"
                                icon={faClose}
                                background="#fee2e2"
                                hoverColor="#fecaca"
                                color="#dc2626"
                                type="button"
                                borderRadius="5px"
                                onClick={() => setIsEditModalOpen(false)}
                            />
                        </>
                    }
                >
                    <div className="modal-scroll-content">
                        <KnowledgeBaseEditWrapper
                            id={selectedId}
                            formRef={formRef}
                            onSuccess={() => {
                                setIsEditModalOpen(false);
                                onReload();
                            }}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
};

export default KnowledgeBaseListing;