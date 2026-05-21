import NoData from '../../../components/UI/NoData/NoData';
import type { AttachmentDTO } from '../models/AttachmentDTO';
import { FiDownload, FiTrash } from 'react-icons/fi';
import FileIcon from '../../../utils/helpers/FileIcon';
import { useAttachmentDownload } from '../hooks/useAttachmentDownload';
import { useAttachmentDelete } from '../hooks/useAttachmentDelete';
import { useState } from 'react';
import ModalConfirm from '../../../components/UI/ModalConfirm/ModalConfirm';

type Props = {
  anexos: AttachmentDTO[] | undefined;
  isLoading: boolean;
  onDelete?: () => void; // ← adiciona
};

function AnexosList({ anexos, isLoading, onDelete }: Props) {

  const { download } = useAttachmentDownload();
  const { deleteAttachment } = useAttachmentDelete(onDelete);
  const [attachmentToDelete, setAttachmentToDelete] = useState<AttachmentDTO | null>(null);


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
              onClick={() => download({ bucket: anexo.bucket, objectName: anexo.objectName })}>
              <FiDownload size={15} />
            </div>

            <div className="anx-delete"
              onClick={() => setAttachmentToDelete(anexo)}>
              <FiTrash size={15} />
            </div>

          </div>
        ))
      )}

      <ModalConfirm
        isOpen={!!attachmentToDelete}
        onClose={() => setAttachmentToDelete(null)}
        onConfirm={() => {
          if (attachmentToDelete) {
            deleteAttachment({ id: attachmentToDelete.id, bucket: attachmentToDelete.bucket, objectName: attachmentToDelete.objectName });
            setAttachmentToDelete(null);
          }
        }}
        title="Remover anexo?"
        message="Esta ação é irreversível. O arquivo será removido permanentemente."
        confirmText="Remover"
        confirmColor="#dc2626"
      />
    </div>
  );
}

export default AnexosList;