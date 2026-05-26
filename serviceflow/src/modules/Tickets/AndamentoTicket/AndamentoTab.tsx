import { faCalendarAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import NoData from "../../../components/UI/NoData/NoData.tsx";
import { type TicketHistoriesDTO } from "../models/TicketHistoriesDTO.ts";
import * as TicketHistoryNote from "../service/ticket-history-service.ts";
import { toValuesTicket } from "../../../utils/helpers/functions.ts";
import "./AndamentoTab.css";
import { showToast } from "../../../layout/Toastify/Toastify.tsx";
import { TicketStatus } from "../constant/TicketStatus";
import type { TicketDTO } from "../models/ticketDTO.ts";
import { getNoteTypeLabel } from "../../../utils/helpers/functions.ts";
import TicketTimeline from "../components/TicketTimeline.tsx";
import Modal from "../../../components/UI/ModalDefault/Modal.tsx";
import TiptapEditor from "../../../components/form/TiptapEditor/TiptapEditor.tsx";


type Props = {
    ticket: TicketDTO;
};

function getInitials(firstName: string, lastName: string): string {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

const AndamentoTab: React.FC<Props> = ({ ticket }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const comentariosEndRef = useRef<HTMLDivElement | null>(null);
    const [showTimeline, setShowTimeline] = useState(false);
    const [andamentos, setAndamentos] = useState<TicketHistoriesDTO[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        annotationPublic: false,
        visibleToRequester: false,
        systemGenerated: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" && e.target instanceof HTMLInputElement
                ? e.target.checked
                : value,
        }));
    };

    const handleDescriptionChange = (value: string) => {
        setFormData((prev) => ({ ...prev, description: value }));
    };

    const fetchAndamentos = async () => {
        setCarregando(true);
        try {
            const response = await TicketHistoryNote.getAllHistoryById(ticket.id);
            setAndamentos(response.data);
        } catch (err) {
            console.error("Erro ao buscar andamentos:", err);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        fetchAndamentos();
    }, [ticket.id]);

    const handleSubmitNote = (e: React.FormEvent) => {
        e.preventDefault();
        const requestBody = toValuesTicket({
            ...formData,
            noteType: 0,
            ticketId: ticket.id,
        });
        TicketHistoryNote.addTicketHistoryNote(requestBody)
            .then(() => {
                fetchAndamentos();
                setFormData({ description: "", annotationPublic: false, visibleToRequester: false, systemGenerated: false });
                showToast.success("Andamento registrado com sucesso!!");

            })
            .catch((e) => {
                console.error("Erro ao salvar nota:", e);
                showToast.error("Erro ao adicionar andamento");
            });

    };

    const groupByDate = (items: TicketHistoriesDTO[]) => {
        const grouped: { [date: string]: TicketHistoriesDTO[] } = {};
        items.forEach((item) => {
            const date = new Date(item.registrationDate).toLocaleDateString("pt-BR");
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(item);
        });
        return grouped;
    };

    const agrupados = groupByDate(andamentos);


    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="at-wrap">
            <div className="container-timeline-ticket">
                <button
                    type="button"
                    className="at-btn-timeline"
                    onClick={handleOpenModal}
                >
                    {showTimeline ? "Ocultar linha do tempo" : "Ver linha do tempo"}
                </button>

                <Modal
                    isOpen={isModalVisible}
                    onClose={handleCloseModal}
                    title="Ciclo de Vida do Chamado"
                    footer=""
                    width="100%"
                    maxBodyHeight="600px"
                >
                    <TicketTimeline andamentos={andamentos} />
                </Modal>
            </div>
            {/* HISTÓRICO */}
            <div className="at-history scroll-content">
                {carregando ? (
                    <p className="at-loading">Carregando andamento...</p>
                ) : Object.keys(agrupados).length === 0 ? (
                    <NoData message="Sem andamentos registrados" />
                ) : (
                    Object.entries(agrupados).map(([data, itens]) => (
                        <React.Fragment key={data}>
                            <div className="at-date-divider">
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: 6 }} />
                                {data}
                            </div>

                            {itens.map((andamento) => (
                                <div key={andamento.id} className={`at-item ${andamento.systemGenerated ? "at-item-system" : "at-item-user"}`}>
                                    <div className={`at-av ${andamento.systemGenerated ? "at-av-system" : ""}`}>
                                        {andamento.systemGenerated
                                            ? "⚙"
                                            : getInitials(andamento.user.firstName, andamento.user.lastName)
                                        }
                                    </div>
                                    <div className={`at-card ${andamento.systemGenerated ? "at-card-system" : ""}`}>
                                        <div className="at-card-head">
                                            <div className="at-author">
                                                <div className="at-author-name">
                                                    {andamento.user.firstName} {andamento.user.lastName}
                                                </div>
                                                <div className="at-author-email">{andamento.user.email}</div>
                                                <div className="at-badges">
                                                    <span className="at-badge at-badge-teal">
                                                        {andamento.annotationPublic ? "Nota pública" : "Nota interna"}
                                                    </span>
                                                    <span className="at-badge at-badge-gray">
                                                        {andamento.visibleToRequester ? "Visível a todos" : "Privado"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="at-time">
                                                {new Date(andamento.registrationDate).toLocaleString("pt-BR", {
                                                    day: "2-digit", month: "2-digit", year: "numeric",
                                                    hour: "2-digit", minute: "2-digit",
                                                })}
                                                <div className="at-note-type">{getNoteTypeLabel(andamento.noteType)}</div>
                                            </div>
                                        </div>
                                        <div className="at-desc">
                                            {andamento.noteType === "STATUS_CHANGE" ? (
                                                <div className="at-status-change">
                                                    <span className="at-status-old">{andamento.oldValue}</span>
                                                    <span className="at-status-arrow">→</span>
                                                    <span className="at-status-new">{andamento.newValue}</span>
                                                </div>
                                            ) : andamento.noteType === "OBSERVATION" ? (
                                                <>
                                                    <span className="at-tag-obs">Observação: </span>
                                                    <div dangerouslySetInnerHTML={{ __html: andamento.description }} />
                                                </>
                                            ) : (
                                                <div dangerouslySetInnerHTML={{ __html: andamento.description }} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))
                )}
                <div ref={comentariosEndRef} />
            </div>


            {
                (ticket.statusTicket === TicketStatus.FINISHED || ticket.statusTicket === TicketStatus.CANCELED) ? (
                    <div className="at-blocked-msg">
                        🚫 Não é possível adicionar notas para tickets finalizados
                    </div>
                ) : (
                    <form onSubmit={handleSubmitNote} className="at-form">
                        <div className="">
                            {/* <textarea
                                id="description"
                                className="at-textarea"
                                placeholder="Adicionar uma nota ao chamado..."
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                            /> */}
                            <TiptapEditor
                                content={formData.description}
                                onChange={handleDescriptionChange}
                                placeholder="Adicionar uma nota ao chamado..."
                                minHeight="150px"
                                maxHeight="200px"
                                scrollable={true}
                            />
                            <div className="at-form-footer">
                                <div className="at-checks">
                                    <label className="at-check-item">
                                        <input
                                            type="checkbox"
                                            id="annotationPublic"
                                            checked={formData.annotationPublic}
                                            onChange={handleChange}
                                            className="at-checkbox"
                                        />
                                        Nota pública
                                    </label>
                                    <label className="at-check-item">
                                        <input
                                            type="checkbox"
                                            id="visibleToRequester"
                                            checked={formData.visibleToRequester}
                                            onChange={handleChange}
                                            className="at-checkbox"
                                        />
                                        Visível ao solicitante
                                    </label>
                                </div>
                                <button type="submit" className="at-btn-save">
                                    <FontAwesomeIcon icon={faSave} style={{ fontSize: 11 }} />
                                    Salvar nota
                                </button>
                            </div>
                        </div>
                    </form>


                )
            }
        </div >
    );
};

export default AndamentoTab;