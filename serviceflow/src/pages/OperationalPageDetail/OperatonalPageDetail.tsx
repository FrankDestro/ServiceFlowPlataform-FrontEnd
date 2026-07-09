import { useParams } from "react-router-dom";
import OperationalTaskDetail from "../../modules/OperationalTask/OperationalTaskDetail/OperationalTaskDetail";

function OperatonalPageDetail() {
  const { id } = useParams();

  return (
    <div>
      <OperationalTaskDetail id={Number(id)} />
    </div>
  )
}

export default OperatonalPageDetail
