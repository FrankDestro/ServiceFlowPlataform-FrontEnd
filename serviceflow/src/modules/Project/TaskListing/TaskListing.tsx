// TaskListing.tsx
import { useRef, useState } from "react";
import { faCheck, faClose, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { ArrowDown, ArrowUp, Eye } from "lucide-react";
import type { TaskFilterDTO, TaskSimpleDTO } from "../models/TaskDTO";
import Button from "../../../components/UI/Button/Button";
import { getPriorityStyle, getStatusBadgeStyle } from "../../../utils/helpers/functions";
import Modal from "../../../components/UI/ModalDefault/Modal";
import TaskDetails from "../TaskDetails/TaskDetails";
import "./TaskListing.css";

type TaskListingProps = {
  tasks: TaskSimpleDTO[];
  onSearch: (formData: TaskFilterDTO) => void;
  changeSort: (field: string) => void;
  onReload: () => void;
  sort: string;
};

function TaskListing({ onSearch, tasks, onReload, changeSort, sort }: TaskListingProps) {

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const getSortIcon = (field: string) => {
    if (!sort.startsWith(field)) {
      return null;
    }
    return sort.endsWith(",asc") ? <ArrowUp size={15} /> : <ArrowDown size={15} />;
  };

  return (
    <>
      {/* <SearchFilterTask onSearch={onSearch}/> */}
      <div className="tsk-container-btn-new">
        <Button
          text="Nova task"
          icon={faPlus}
          background="#185FA5"
          hoverColor="#0C447C"
          type="button"
          borderRadius="5px"
          size="small"
          onClick={() => setIsNewModalOpen(true)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => changeSort("taskNumber")} style={{ cursor: "pointer" }}>Nº {getSortIcon("taskNumber")}</th>
            <th onClick={() => changeSort("title")} style={{ cursor: "pointer" }}>Título {getSortIcon("title")}</th>
            <th>Projeto</th>
            <th>Sprint</th>
            <th onClick={() => changeSort("priority")} style={{ cursor: "pointer" }}>Prioridade {getSortIcon("priority")}</th>
            <th onClick={() => changeSort("status")} style={{ cursor: "pointer" }}>Status {getSortIcon("status")}</th>
            <th>Responsável</th>
            <th onClick={() => changeSort("dueDate")} style={{ cursor: "pointer" }}>Criado em {getSortIcon("dueDate")}</th>
            <th onClick={() => changeSort("dueDate")} style={{ cursor: "pointer" }}>Prazo{getSortIcon("dueDate")}</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskNumber}>
              <td style={{ color: "#185FA5", fontWeight: 700 }}>{task.taskNumber}</td>
              <td className="tsk-limited-text">{task.title}</td>
              <td>{task.projectNumber ?? "—"}</td>
              <td>{task.springName ?? "—"}</td>
              <td><span style={getPriorityStyle(task.priority)}>{task.priority}</span></td>
              <td><span style={getStatusBadgeStyle(task.status)}>{task.status}</span></td>
              <td>{task.assignedTo ?? "Não atribuído"}</td>
              <td>{task.createAt ?? "—"}</td>
              <td>{task.dueDate ?? "—"}</td>
              <td>
                <div className="btn-action"
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setIsViewModalOpen(true);
                  }}>
                  <Eye size={16} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Novo */}
      {isNewModalOpen && (
        <Modal
          title="Nova task"
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          width="1200px"
          maxBodyHeight="120vh"
          allowMaximize={true}
        >
          <div>Conteudo</div>
          {/* <KnowledgeBaseCreateForm
            onSuccess={() => setIsNewModalOpen(false)}
            onReload={onReload}
          /> */}
        </Modal>
      )}

      {/* Modal Visualizar */}
      {isViewModalOpen && selectedTaskId && (
        <Modal
          title="Detalhes da task"
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedTaskId(null);
            onReload();
          }}
          width="1200px"
          footer={
            <>
              <div className="tsk-modal-footer">
                <div className="tsk-modal-footer-actions">
                  <Button text="Iniciar" icon={faCheck} type="button" borderRadius="8px" hoverColor="" className="tsk-btn-start" />
                  <Button text="Concluir" icon={faCheck} type="button" borderRadius="8px" hoverColor="" className="tsk-btn-complete" />
                  <Button text="Cancelar task" icon={faX} type="button" borderRadius="8px" hoverColor="" className="tsk-btn-cancel" />
                </div>

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
                  }} />

              </div>
            </>
          }
        >
          <div className="modal-scroll-content">
            <TaskDetails id={selectedTaskId} />
          </div>
        </Modal>
      )}


    </>
  );
}

export default TaskListing
