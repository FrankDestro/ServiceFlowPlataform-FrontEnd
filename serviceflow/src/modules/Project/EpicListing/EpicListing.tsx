import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PencilLine, Eye, ArrowUp, ArrowDown } from "lucide-react";
import type { EpicFilterFormData, EpicSimpleDTO } from "../models/EpicDTO";
import SearchFilterEpic from "../components/SearchFilterEpic/SearchFilterEpic";
import Button from "../../../components/UI/Button/Button";
import { getPriorityStyle, getStatusBadgeStyle } from "../../../utils/helpers/functions";
import "./EpicListing.css";

type EpicListingProps = {
  epics: EpicSimpleDTO[];
  onSearch: (formData: EpicFilterFormData) => void;
  onReload: () => void;
  changeSort: (field: string) => void;
  sort: string;
};

const EpicListing = ({ onSearch, epics, changeSort, sort }: EpicListingProps) => {

  const navigate = useNavigate();

  function renderSortIcon(field: string) {
    if (!sort.startsWith(field)) return null;
    return sort.endsWith(",desc") ? <ArrowDown size={12} /> : <ArrowUp size={12} />;
  }

  return (
    <>
      <SearchFilterEpic onSearch={onSearch} projects={[]} />
      <div className="ep-container-btn-new">
        <Button
          text="Novo épico"
          icon={faPlus}
          background="#185FA5"
          hoverColor="#0C447C"
          type="button"
          borderRadius="5px"
          size="small"
          onClick={() => navigate("/epics/new")}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => changeSort("epicNumber")} style={{ cursor: "pointer" }}>Nº {renderSortIcon("epicNumber")}</th>
            <th onClick={() => changeSort("title")} style={{ cursor: "pointer" }}>Título {renderSortIcon("title")}</th>
            <th>Projeto</th>
            <th onClick={() => changeSort("startDate")} style={{ cursor: "pointer" }}>Início {renderSortIcon("startDate")}</th>
            <th onClick={() => changeSort("dueDate")} style={{ cursor: "pointer" }}>Prazo {renderSortIcon("dueDate")}</th>
            <th onClick={() => changeSort("priority")} style={{ cursor: "pointer" }}>Prioridade {renderSortIcon("priority")}</th>
            <th onClick={() => changeSort("status")} style={{ cursor: "pointer" }}>Status {renderSortIcon("status")}</th>
            <th>Tasks</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {epics.map((epic) => (
            <tr key={epic.epicNumber}>
              <td style={{ color: "#185FA5", fontWeight: 700 }}>{epic.epicNumber}</td>
              <td className="ep-limited-text">{epic.title}</td>
              <td>{epic.projectNumber ?? "—"}</td>
              <td>{epic.startDate ?? "—"}</td>
              <td>{epic.dueDate ?? "—"}</td>
              <td><span style={getPriorityStyle(epic.priority)}>{epic.priority}</span></td>
              <td><span style={getStatusBadgeStyle(epic.status)}>{epic.status}</span></td>
              <td>{epic.taskCount ?? 0}</td>
              <td>
                <div
                  className="btn-action"
                  onClick={() => navigate(`/epics/${epic.id}/edit`)}
                  style={{
                    opacity: epic.status === "DONE" || epic.status === "CANCELLED" ? 0.4 : 1,
                    cursor: epic.status === "DONE" || epic.status === "CANCELLED" ? "not-allowed" : "pointer"
                  }}
                >
                  <PencilLine size={16} />
                </div>
                <div
                  className="btn-action"
                  onClick={() => navigate(`/epics/${epic.id}`)}
                >
                  <Eye size={16} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
};

export default EpicListing;