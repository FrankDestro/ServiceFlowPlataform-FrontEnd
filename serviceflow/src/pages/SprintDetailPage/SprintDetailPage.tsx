import { useParams } from 'react-router-dom';
import SprintDetail from '../../modules/Project/SprintDetail/SprintDetail';

function SprintDetailPage() {

    const { id } = useParams();

    return (
        <div>
            <SprintDetail id={Number(id)} />
        </div>
    )
}

export default SprintDetailPage
