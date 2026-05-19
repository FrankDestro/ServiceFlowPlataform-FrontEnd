import { getPriorityClass, getStatusBadgeClass } from "../../../../utils/helpers/functions";
import type { ChangeSummaryDTO } from "../../models/ProblemDTO";
import "./RelatedChangesTable.css";

type Props = {
    changes: ChangeSummaryDTO[];
};

export default function RelatedChangesTable({ changes }: Props) {
    if (changes.length === 0)
        return <span style={{ fontSize: 11, color: "#94a3b8" }}>Nenhuma mudança associada</span>;

    return (
        <table className="related-changes-table">
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
                {changes.map((change: ChangeSummaryDTO) => (
                    <tr key={change.changeNumber}>
                        <td className="prb-detail-ticket-number">{change.changeNumber}</td>
                        <td>{change.title}</td>
                        <td><span className={getPriorityClass(change.priority)}>{change.priority}</span></td>
                        <td><span className={getStatusBadgeClass(change.status)}>{change.status}</span></td>
                        <td>{change.changeOwner ?? "—"}</td>
                        <td>{change.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}