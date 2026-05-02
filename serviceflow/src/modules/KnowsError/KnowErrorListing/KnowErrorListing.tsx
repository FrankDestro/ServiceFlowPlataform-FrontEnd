import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO } from "date-fns";
import { Eye, EyeIcon, PencilLine, ThumbsUp } from "lucide-react";
import * as functions from "../../../utils/helpers/functions.ts";
import SearchFilterKnowError from "../components/SearchFilterKnowError/SearchFilterKnowError.tsx";
import type { KnowErrorSearchParams, KnowErrorSimpleDTO } from "../models/knowErrorDTO.ts";
import "./KnowErrorListing.css";
import { useRef, useState } from "react";
import Button from "../../../components/UI/Button/Button.tsx";
import { faClose, faPlus, faSave, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/UI/ModalDefault/Modal.tsx";
import KnowErrorDetail from "../KnowErrorDetail/KnowErrorDetail.tsx";
import KnowErrorEditWrapper from "../KnowErrorEditWrapper/KnowErrorEditWrapper.tsx";
import * as KnowErrorService from "../services/knowError-service.ts"
import { toast } from "react-toastify";
import KnowErrorCreateForm from "../KnowErrorCreateForm/KnowErrorCreateForm.tsx";

type TableKnowErrorProps = {
    knowerros: KnowErrorSimpleDTO[];
    onSearch: (formData: KnowErrorSearchParams) => void;
    onReload: () => void;
};

const KnowErrorListing = ({ onSearch, knowerros, onReload }: TableKnowErrorProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <div className="container-base">
                <SearchFilterKnowError onSearch={onSearch} />
            </div>
            <div className="container-btn-new-knowerror">
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
            <table className="container-base">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Tags</th>
                        <th>Sistemas Afetados</th>
                        <th>Status</th>
                        <th>Criado por</th>
                        <th>Criado em</th>
                        <th style={{ alignItems: "center" }}><EyeIcon size={14}></EyeIcon>Views</th>
                        <th style={{ alignItems: "center" }}><ThumbsUp size={14} /> Útil</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {knowerros.map((ke) => (
                        <tr key={ke.id}>

                            {/* ID */}
                            <td>{ke.id}</td>

                            {/* Título */}
                            <td className="limited-text">{ke.title}</td>

                            {/* Tags */}
                            <td>
                                <div className="tag-list">
                                    {ke.tags?.slice(0, 2).map((tag, index) => (
                                        <span key={index} className="tag-td">{tag}</span>
                                    ))}
                                    {ke.tags?.length > 2 && (
                                        <span className="tag-td">+{ke.tags.length - 2}</span>
                                    )}
                                </div>
                            </td>

                            {/* Sistemas Afetados */}
                            <td className="limited-text">
                                {ke.affectedSystems ?? "—"}
                            </td>

                            {/* Status */}
                            <td>
                                <span style={functions.getStatusKnowErrorsBadgeStyle(ke.status)}>
                                    {ke.status}
                                </span>
                            </td>

                            {/* Criado por */}
                            <td>{ke.registratorUserEmail ?? "—"}</td>

                            {/* Criado em */}
                            <td>{format(parseISO(ke.createDate), "dd/MM/yyyy HH:mm")}</td>

                            <td style={{ textAlign: "center", color: "#6366f1", fontWeight: 600 }}>{ke.viewsCount}</td>
                            <td style={{ textAlign: "center", color: "#16a34a", fontWeight: 600 }}>{ke.helpfulCount}</td>

                            {/* Opções */}
                            <td>
                                <div className="btn-action"
                                    onClick={() => {
                                        if (ke.status === "ARCHIVED") return;
                                        setSelectedId(ke.id);
                                        setIsEditModalOpen(true);
                                    }}
                                    style={{ opacity: ke.status === "ARCHIVED" ? 0.4 : 1, cursor: ke.status === "ARCHIVED" ? "not-allowed" : "pointer" }}
                                >
                                    <PencilLine size={16} />
                                </div>
                                <div className="btn-action"
                                    onClick={() => {
                                        setSelectedId(ke.id);
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

            {isNewModalOpen && (
                <Modal
                    title="Novo Erro Conhecido"
                    isOpen={isNewModalOpen}
                    onClose={() => setIsNewModalOpen(false)}
                    width="900px"
                >
                    <div className="modal-scroll-content">
                        <KnowErrorCreateForm
                            onSuccess={() => {
                                setIsNewModalOpen(false)
                            }}
                            onReload={onReload}
                        />
                    </div>
                </Modal>
            )}

            {isViewModalOpen && selectedId && (
                <Modal
                    title="Detalhes do Erro"
                    isOpen={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setSelectedId(null);
                        onReload();
                    }}
                    width="900px"
                    footer={
                        <>

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

                            <Button
                                text="Útil"
                                icon={faThumbsUp}
                                background="#f0fdf4"
                                hoverColor="#dcfce7"
                                color="#16a34a"
                                type="button"
                                borderRadius="5px"
                                onClick={() => {
                                    KnowErrorService.markAsHelpfulKnowErrorRequest(selectedId!)
                                        .then(() => toast.success("Marcado como útil! 👍"))
                                        .catch(() => toast.error("Erro ao marcar como útil."));
                                }}
                            />
                        </>
                    }
                >
                    <div className="modal-scroll-content">
                        <KnowErrorDetail
                            id={selectedId} />
                    </div>
                </Modal>
            )}


            {isEditModalOpen && selectedId && (
                <Modal
                    title="Editar Erro Conhecido"
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedId(null);
                    }}
                    width="900px"
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
                        <KnowErrorEditWrapper
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

export default KnowErrorListing;