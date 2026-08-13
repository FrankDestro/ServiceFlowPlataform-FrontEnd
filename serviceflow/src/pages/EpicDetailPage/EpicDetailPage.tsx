import { useParams } from 'react-router-dom';
import EpicDetail from '../../modules/Project/EpicDetails/EpicDetail';

function EpicDetailPage() {

    const { id } = useParams();

    return (
        <div>
            <EpicDetail id={Number(id)} />
        </div>
    )
}

export default EpicDetailPage
