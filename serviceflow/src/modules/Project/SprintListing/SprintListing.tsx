import { useNavigate } from "react-router-dom";
import type { SprintFilterFormData, SprintSimpleDTO } from "../models/SprintDTO";
import { ArrowDown, ArrowUp, Eye, PencilLine } from "lucide-react";
import Button from "../../../components/UI/Button/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getStatusBadgeStyle } from "../../../utils/helpers/functions";

type SprintListingProps = {
  sprints: SprintSimpleDTO[];
  onSearch: (formData: SprintFilterFormData) => void;
  onReload: () => void;
  changeSort: (field: string) => void;
  sort: string;
};


function SprintListing({ onSearch, sprints, changeSort, sort }: SprintListingProps) {

  const navigate = useNavigate();

  function renderSortIcon(field: string) {
    if (!sort.startsWith(field)) return null;
    return sort.endsWith(",desc") ? <ArrowDown size={12} /> : <ArrowUp size={12} />;
  }

  return (
    <>
      {/* <SearchFilterEpic onSearch={onSearch} projects={[]} /> */}
      <div className="ep-container-btn-new">
        <Button
          text="Nova sprint"
          icon={faPlus}
          background="#185FA5"
          hoverColor="#0C447C"
          type="button"
          borderRadius="5px"
          size="small"
          onClick={() => navigate("/sprint/new")}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => changeSort("epicNumber")} style={{ cursor: "pointer" }}>Nº {renderSortIcon("epicNumber")}</th>
            <th>Goal</th>
            <th onClick={() => changeSort("startDate")} style={{ cursor: "pointer" }}>Início {renderSortIcon("startDate")}</th>
            <th onClick={() => changeSort("endDate")} style={{ cursor: "pointer" }}>Prazo {renderSortIcon("endDate")}</th>
            <th onClick={() => changeSort("projetoNumber")} style={{ cursor: "pointer" }}>Projeto {renderSortIcon("projetoNumber")}</th>
            <th onClick={() => changeSort("status")} style={{ cursor: "pointer" }}>status {renderSortIcon("status")}</th>
            <th>Tasks</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {sprints.map((sprints) => (
            <tr key={sprints.name}>
              <td style={{ color: "#185FA5", fontWeight: 700 }}>{sprints.name}</td>
              <td>{sprints.goal}</td>
              <td>{sprints.startDate ?? "—"}</td>
              <td>{sprints.endDate ?? "—"}</td>
              <td>{sprints.projectNumber ?? "—"}</td>
              <td><span style={getStatusBadgeStyle(sprints.status)}>{sprints.status}</span></td>
              <td>{sprints.taskCount ?? 0}</td>
              <td>
                <div
                  className="btn-action"
                  onClick={() => navigate(`/sprints/${sprints.id}/edit`)}
                  style={{
                    opacity: sprints.status === "COMPLETED" || sprints.status === "CANCELLED" ? 0.4 : 1,
                    cursor: sprints.status === "COMPLETED" || sprints.status === "CANCELLED" ? "not-allowed" : "pointer"
                  }}
                >
                  <PencilLine size={16} />
                </div>
                <div
                  className="btn-action"
                  onClick={() => navigate(`/sprints/${sprints.id}`)}
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
}

export default SprintListing
