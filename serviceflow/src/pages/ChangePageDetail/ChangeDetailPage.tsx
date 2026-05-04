import ChangeDetail from '../../modules/Change/ChangeDetail/ChangeDetail'
import { useParams } from "react-router-dom";

function ChangeDetailPage() {
    const { id } = useParams();
    
    return (
        <div>
            <ChangeDetail id={Number(id)} />
        </div>
    )
}

export default ChangeDetailPage
