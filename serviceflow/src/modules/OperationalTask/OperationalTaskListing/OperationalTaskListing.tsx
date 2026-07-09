// OperationalTaskListing.tsx
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Eye, PencilLine } from "lucide-react";
import SearchFilterOperationalTask from "../components/SearchFilterOperationalTask/SearchFilterOperationalTask.tsx";
import type { OperationalTaskSearchParams, OperationalTaskSimpleDTO } from "../model/operationalTaskDTO.ts";
import Button from "../../../components/UI/Button/Button.tsx";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getPriorityStyle, getStatusBadgeStyle } from "../../../utils/helpers/functions.ts";
import "./OpertationalTaskListing.css";

type OperationalTaskListingProps = {
  tasks: OperationalTaskSimpleDTO[];
  onSearch: (formData: OperationalTaskSearchParams) => void;
  onReload: () => void;
  categories: { id: number; name: string }[];
};

const OperationalTaskListing = ({ onSearch, tasks, categories }: OperationalTaskListingProps) => {

  const navigate = useNavigate();

  return (
    <>
      <SearchFilterOperationalTask onSearch={onSearch} categories={categories} />
      <div className="ot-container-btn-new">
        <Button
          text="Nova tarefa"
          icon={faPlus}
          background="#0f766e"
          hoverColor="#0d9488"
          type="button"
          borderRadius="5px"
          size="small"
          onClick={() => navigate("/operational-tasks/new")}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Título</th>
            <th>Início agendado</th>
            <th>Término agendado</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Categoria</th>
            <th>Responsável</th>


            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskNumber}>
              <td style={{ color: "#0f766e", fontWeight: 700 }}>{task.taskNumber}</td>
              <td className="ot-limited-text">{task.title}</td>
              <td>{task.scheduledStart ?? "—"}</td>
              <td>{task.scheduledEnd ?? "—"}</td>
              <td><span style={getPriorityStyle(task.priority)}>{task.priority}</span></td>
              <td><span style={getStatusBadgeStyle(task.status)}>{task.status}</span></td>
              <td>{task.categoryName ?? "—"}</td>
              <td>{task.assignedToName ?? "Não atribuído"}</td>


              <td>
                <div
                  className="btn-action"
                  onClick={() => navigate(`/operational-tasks/${task.id}/edit`)}
                  style={{
                    opacity: task.status === "COMPLETED" || task.status === "CANCELLED" ? 0.4 : 1,
                    cursor: task.status === "COMPLETED" || task.status === "CANCELLED" ? "not-allowed" : "pointer"
                  }}
                >
                  <PencilLine size={16} />
                </div>
                <div
                  className="btn-action"
                  onClick={() => navigate(`/tarefas-operacionais/${task.id}`)}
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

export default OperationalTaskListing;