// ChangeListing.tsx
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Eye, PencilLine } from "lucide-react";
import SearchFilterChange from "../components/SearchFilterChange/SearchFilterChange.tsx";
import type { ChangeSearchParams, ChangeSimpleDTO } from "../models/ChangeDTO.ts";
import "./ChangeListing.css";
import Button from "../../../components/UI/Button/Button.tsx";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getPriorityStyle, getStatusBadgeStyle, getTypeBadgeStyle } from "../../../utils/helpers/functions.ts";

type ChangeListingProps = {
    changes: ChangeSimpleDTO[];
    onSearch: (formData: ChangeSearchParams) => void;
    onReload: () => void;
};

const ChangeListing = ({ onSearch, changes, onReload }: ChangeListingProps) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="ch-container-base">
                <SearchFilterChange onSearch={onSearch} />
            </div>
            <div className="ch-container-btn-new">
                <Button
                    text="Abrir nova mudança"
                    icon={faPlus}
                    background="#0f766e"
                    hoverColor="#0d9488"
                    type="button"
                    borderRadius="5px"
                    size="small"
                    onClick={() => navigate("/changes/new")}
                />
            </div>
            <table className="ch-container-base">
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>Título</th>
                        <th>Tipo</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Responsável</th>
                        <th>Início agendado</th>
                        <th>Fim agendado</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {changes.map((change) => (
                        <tr key={change.id}>
                            <td style={{ color: "#0f766e", fontWeight: 700 }}>{change.changeNumber}</td>
                            <td className="ch-limited-text">{change.title}</td>
                            <td><span style={getTypeBadgeStyle(change.changeTypeName)}>{change.changeTypeName}</span></td>
                            <td><span style={getPriorityStyle(change.priority)}>{change.priority}</span></td>
                            <td><span style={getStatusBadgeStyle(change.status)}>{change.status}</span></td>
                            <td>{change.changeOwnerEmail ?? "—"}</td>
                            <td>{change.scheduledStart ? change.scheduledStart : "—"}</td>
                            <td>{change.scheduledEnd ? change.scheduledEnd : "—"}</td>
                            <td>
                                <div
                                    className="btn-action"
                                    onClick={() => navigate(`/changes/${change.id}/edit`)}
                                    style={{
                                        opacity: change.status === "COMPLETED" || change.status === "CANCELLED" ? 0.4 : 1,
                                        cursor: change.status === "COMPLETED" || change.status === "CANCELLED" ? "not-allowed" : "pointer"
                                    }}
                                >
                                    <PencilLine size={16} />
                                </div>
                                <div
                                    className="btn-action"
                                    onClick={() => navigate(`/changes/${change.id}`)}
                                >
                                    <Eye size={16} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ChangeListing;