import AnexoTabGeral from "../../../Attachment/modules/AnexoTabGeral/AnexoTabGeral";
import { ProblemStatus } from "../../constants/ProblemStatus";
import type { ProblemSimpleDTO } from "../../models/ProblemDTO";

type Props = {
    problem: ProblemSimpleDTO
};

const AnexoTabProblem: React.FC<Props> = ({ problem }) => {
    return (
        <AnexoTabGeral
            entityType="TICKET"
            entityId={problem.id.toString()}
            isReadOnly={problem.status === ProblemStatus.CLOSED || problem.status === ProblemStatus.RESOLVED}
            readOnlyMessage="Não é possível adicionar anexos para tickets finalizados"
        />
    );
};

export default AnexoTabProblem;