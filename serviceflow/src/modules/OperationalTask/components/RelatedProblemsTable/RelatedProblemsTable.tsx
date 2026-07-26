import { getPriorityClass, getStatusBadgeClass } from "../../../../utils/helpers/functions";
import type { ProblemSummaryDTO } from "../../model/operationalTaskDTO";
import "./RelatedProblemsTable.css";

type Props = {
    problems: ProblemSummaryDTO[];
};

export default function RelatedProblemsTable({ problems }: Props) {
    if (problems.length === 0)
        return <span style={{ fontSize: 11, color: "#94a3b8" }}>Nenhum problema relacionado</span>;

    return (
        <table className="related-problems-table">
            <thead>
                <tr>
                    <th>Nº</th>
                    <th>Título</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Responsável</th>
                    <th>Data registro</th>
                </tr>
            </thead>
            <tbody>
                {problems.map((problem: ProblemSummaryDTO) => (
                    <tr key={problem.problemNumber}>
                        <td className="prb-detail-ticket-number">{problem.problemNumber}</td>
                        <td>{problem.title}</td>
                        <td><span className={getPriorityClass(problem.priority)}>{problem.priority}</span></td>
                        <td><span className={getStatusBadgeClass(problem.status)}>{problem.status}</span></td>
                        <td>{problem.createdBy ?? "—"}</td>
                        <td>{problem.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}