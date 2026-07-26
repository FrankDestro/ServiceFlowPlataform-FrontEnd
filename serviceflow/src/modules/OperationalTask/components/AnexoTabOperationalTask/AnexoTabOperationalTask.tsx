import AnexoTabGeral from "../../../Attachment/modules/AnexoTabGeral/AnexoTabGeral";
import { OperationalTaskStatus } from "../../components/constants/OperationalTaskStatus";
import type { OperationalTaskDetailsDTO } from "../../model/operationalTaskDTO";

type Props = {
    operationalTask: OperationalTaskDetailsDTO
};

const AnexoTabOperationalTask: React.FC<Props> = ({ operationalTask }) => {
    return (
        <AnexoTabGeral
            entityType="OPERATIONAL_TASK"
            entityId={operationalTask.id.toString()}
            isReadOnly={operationalTask.status === OperationalTaskStatus.COMPLETED || operationalTask.status === OperationalTaskStatus.CANCELLED}
            readOnlyMessage="Não é possível adicionar anexos para tarefas operacionais finalizadas"
        />
    );
};

export default AnexoTabOperationalTask;