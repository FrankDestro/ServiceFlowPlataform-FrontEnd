import { useParams } from "react-router-dom";
import ProblemDetail from "../../../modules/ProblemManagement/ProblemManagementDetail/ProblemDetail";

function ManagementProblemPageDetail() {
    const { id } = useParams();
    return (
        <div>
            <ProblemDetail id={Number(id)} />
        </div>
    )
}

export default ManagementProblemPageDetail
