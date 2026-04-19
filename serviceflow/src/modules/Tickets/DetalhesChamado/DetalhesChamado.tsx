import {
    faCircleInfo,
    faRotate,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import semDados from "../../../assets/sem-dados.png";
import {type TicketDTO} from "../models/ticketDTO.ts";
import {
    getSeverityBadgeStyle,
    getStatusTicketBadgeStyle,
} from "../../../utils/helpers/functions.ts";
import "./DetalhesChamado.css";
import AtualizacaoTicket from "../AtualizacaoTicket/AtualizacaoTicket.tsx";

type Props = {
    ticket: TicketDTO;
};

const DetalhesChamado: React.FC<Props> = ({ticket}) => {
    return (
        <div className="container-detalhes">
            <div className="coluna">
                <h4>
                    <FontAwesomeIcon icon={faCircleInfo} color="#11344d"/> Dados do Chamado
                </h4>
                <p>
                    <strong>Assunto:</strong> {ticket.subject}
                </p>
                <p>
                    <strong>Descrição:</strong> {ticket.description}
                </p>
                <p>
                    <strong>Status:</strong>{" "}
                    <span style={getStatusTicketBadgeStyle(ticket.statusTicket)}>
            {ticket.statusTicket}
          </span>
                </p>

                <p>
                    <strong>Tipo de Requisição:</strong> {ticket.typeRequest.name}
                </p>
                <p>
                    <strong>Data Registro:</strong>{" "}
                    {new Date(ticket.registrationDate).toLocaleString()}
                </p>
                <p>
                    <strong>Data Conclusão:</strong>{" "}
                    {ticket.completionDate === null
                        ? "Não finalizado"
                        : new Date(ticket.completionDate).toLocaleString()}
                </p>
                <p>
                    <strong>Data final:</strong>{" "}
                    {new Date(ticket.dueDate).toLocaleString()}
                </p>
                <p>
                    <strong>Categoria:</strong> {ticket.categoryTicket.name}
                </p>
                <p>
                    <strong>Área Solucionadora:</strong> {ticket.solvingArea.name}
                </p>
                <p>
                    <strong>Severidade:</strong>{" "}
                    <span style={getSeverityBadgeStyle(ticket.sla.severity)}>
            {ticket.sla.severity}
          </span>
                </p>
                <p>
                    <strong>Tempo de resposta:</strong> {ticket.sla.responseTime} horas{" "}
                </p>
                <p>
                    {ticket.parentTicketId ? (
                        <>
                            <strong>Ticket pai:</strong> {ticket.parentTicketId}
                        </>
                    ) : (
                        <>
                            <strong>Ticket pai:</strong>
                            <em> Não possui ticket pai</em>
                        </>
                    )}
                </p>
            </div>

            <div className="coluna">
                <h4>
                    <FontAwesomeIcon icon={faUsers} color="#11344d"/> Participantes do Chamado
                </h4>

                <div className="container-participantes-chamado">
                    <div className="container-solicitante">
                        <div>
                            <p style={{fontWeight: 600, color: "gray"}}>Solicitante</p>
                        </div>

                        <div style={{padding: "10px", display: "flex", alignItems: "center"}}>
                            <div>
                                <img
                                    src={ticket.requester.imgProfile}
                                    alt="Solicitante"
                                    className="foto"
                                />
                            </div>
                            <div>
                                <p>
                                    <strong>Nome:</strong> {ticket.requester.firstName}{" "}
                                    {ticket.requester.lastName}
                                </p>
                                <p>
                                    <strong>Email:</strong> {ticket.requester.email}
                                </p>
                                <p>
                                    <strong>Telefone:</strong> {ticket.requester.contactNumber}
                                </p>
                                <p>
                                    <strong>Departamento:</strong>{" "}
                                    {ticket.requester.department.description}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="container-tecnico">
                        <div>
                            <p style={{fontWeight: 600, color: "gray"}}>Analista</p>

                        </div>
                        <div style={{padding: "10px", display: "flex", alignItems: "center"}}>
                            {ticket.technician ? (
                                <>
                                    <div>
                                        <img
                                            src={ticket.technician.imgProfile}
                                            alt="Técnico"
                                            className="foto"
                                        />
                                    </div>

                                    <div>
                                        <p>
                                            <strong>Nome:</strong> {ticket.technician.firstName}{" "}
                                            {ticket.technician.lastName}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> {ticket.technician.email}
                                        </p>
                                        <p>
                                            <strong>Telefone:</strong> {ticket.technician.contactNumber}
                                        </p>
                                        <p>
                                            <strong>Departamento:</strong>{" "}
                                            {ticket.technician.department.description}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="container-nao-atribuido">
                                    <img src={semDados} alt="sem-dados"></img>
                                    <p>
                                        <em>Não atribuído</em>
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>

            <div className="coluna">
                <h4>
                    <FontAwesomeIcon icon={faRotate} color="#11344d"/> Atualização chamado
                </h4>
                <AtualizacaoTicket/>
            </div>
        </div>
    );
};

export default DetalhesChamado;
