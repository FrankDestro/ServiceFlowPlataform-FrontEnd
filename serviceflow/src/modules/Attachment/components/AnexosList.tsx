import NoData from '../../../components/UI/NoData/NoData';
import type { AttachmentDTO } from '../models/AttachmentDTO';
import { FiDownload } from 'react-icons/fi';
import FileIcon from '../../../utils/helpers/FileIcon';
import { useAttachmentDownload } from '../hooks/useAttachmentDownload';

type Props = {
  anexos: AttachmentDTO[] | undefined;
  isLoading: boolean;
};

function AnexosList({ anexos, isLoading }: Props) {

  const { download } = useAttachmentDownload();

  if (isLoading)
    return <p className="at-loading">Carregando anexos...</p>;


  return (
    <div className="anx-list">
      {!anexos || anexos.length === 0 ? (
        <NoData message="Sem anexos disponíveis" />
      ) : (
        anexos.map((anexo) => (
          <div key={anexo.id} className="anx-item">
            <FileIcon type={anexo.type} />
            <div className="anx-info">
              <div className="anx-name">{anexo.originalName}</div>
              <div className="anx-meta">
                {anexo.sizeInMb} MB · {new Date(anexo.registrationDate).toLocaleString("pt-BR", {
                  day: "2-digit", month: "2-digit", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
                {anexo.user && (
                  <span> · {anexo.user.firstName} {anexo.user.lastName}</span>
                )}
              </div>
            </div >
            <div className="anx-download"
              onClick={() => download({ bucket: anexo.bucket, objectName: anexo.objectName })}
            >
              <FiDownload size={15} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AnexosList;