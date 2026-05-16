// ManagementProblemListing.tsx
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Eye } from "lucide-react";
import SearchFilterProblem from "../components/SearchFilterProblem/SearchFilterProblem.tsx";
import type { ProblemSearchParams, ProblemSimpleDTO } from "../models//ProblemDTO.ts";
import "./ManagementProblemListing.css";
import Button from "../../../components/UI/Button/Button.tsx";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getPriorityStyle, getStatusBadgeStyle, getUrgencyStyle } from "../../../utils/helpers/functions.ts";

type ManagementProblemListingProps = {
    problems: ProblemSimpleDTO[];
    onSearch: (formData: ProblemSearchParams) => void;
    onReload: () => void;
};

const ManagementProblemListing = ({ onSearch, problems, onReload }: ManagementProblemListingProps) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="prb-container-base">
                <SearchFilterProblem onSearch={onSearch} />
            </div>
            <div className="prb-container-btn-new">
                <Button
                    text="Abrir novo problema"
                    icon={faPlus}
                    background="#0f766e"
                    hoverColor="#0d9488"
                    type="button"
                    borderRadius="5px"
                    size="small"
                    onClick={() => navigate("/problems/new")}
                />
            </div>
            <table className="prb-container-base">
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Prioridade</th>
                        <th>Urgência</th>
                        <th>Status</th>
                        <th>Responsável</th>
                        <th>Prazo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem) => (
                        <tr key={problem.id}>
                            <td style={{ color: "#0f766e", fontWeight: 700 }}>{problem.problemNumber}</td>
                            <td className="prb-limited-text">{problem.title}</td>
                            <td>{problem.categoryName ?? "—"}</td>
                            <td><span style={getPriorityStyle(problem.priority)}>{problem.priority}</span></td>
                            <td><span style={getUrgencyStyle(problem.urgency)}>{problem.urgency}</span></td>
                            <td><span style={getStatusBadgeStyle(problem.status)}>{problem.status}</span></td>
                            <td>{problem.assignedToName ?? "—"}</td>
                            <td>{problem.dueDate ? problem.dueDate : "—"}</td>
                            <td>
                                <div
                                    className="btn-action"
                                    onClick={() => navigate(`/problems/${problem.id}`)}
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

export default ManagementProblemListing;