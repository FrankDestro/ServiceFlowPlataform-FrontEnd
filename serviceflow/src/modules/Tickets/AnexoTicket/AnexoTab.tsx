import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import {
  type AttachmentDTO,
} from "../../Attachment/models/AttachmentDTO";
import * as anexoService from "../../Attachment/service/attachment-service";
import FileIcon from "../../../utils/helpers/FileIcon";
import { getFileType } from "../../../utils/helpers/functions";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/ModalDefault/Modal";
import "./AnexoTab.css";
import NoData from "../../../components/UI/NoData/NoData";

type Props = {
  anexos: AttachmentDTO[];
  idTicket: number;
};

const AnexoTab: React.FC<Props> = ({ anexos, idTicket }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Selecione um arquivo antes de salvar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const fileType = getFileType(selectedFile.type);

    if (!fileType) {
      alert("Tipo de arquivo inválido.");
      return;
    }

    const sizeInMB = Math.round(selectedFile.size / (1024 * 1024));

    const attachmentData: AttachmentDTO = {
      fileName: selectedFile.name,
      type: fileType,
      sizeInMB: sizeInMB,
      url: "irá utilziar o s3 bucket",
      ticketId: idTicket,
    };

    try {
      const result = anexoService.addAttachments(attachmentData);

      if ((await result).status === 200) {
        setShowModal(false);
        setSelectedFile(null);
      } else {
        alert("Erro ao enviar o anexo.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro inesperado.");
    }
  };

  return (
  <>
  <section className="aba-anexo">
    <ul className="lista-anexos">
      {anexos.length === 0 ? (
        <NoData message="Sem anexos disponíveis" />
      ) : (
        anexos.map((anexo) => {
          const { id, type, fileName, registrationDate, url, user } = anexo;

          return (
            <li key={id} className="item-anexo">
              <FileIcon type={type} />
              <div className="info">
                <strong>{fileName}</strong>
                <small className="file-name">
                  {fileName} • {anexo.sizeInMB} MB
                </small>
                <small className="data">
                  {new Date(registrationDate).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <span style={{ marginLeft: "10px" }}>
                    {user.firstName} {user.lastName} ({user.department.description})
                  </span>
                </small>
              </div>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="download-link"
                title="Baixar"
              >
                <FiDownload />
              </a>
            </li>
          );
        })
      )}
    </ul>
  </section>

  <div
    className="container-button-adicionar-notas"
    onClick={() => setShowModal(true)}
  >
    <Button
      text="Adicionar anexo"
      icon={faPaperclip}
      background="#11344d"
      hoverColor="#335577"
      type="submit"
      borderRadius="5px"
    />
  </div>

  <Modal
    title="Anexar um documento"
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    footer={
      <button onClick={handleUpload} className="btn-salvar">
        Salvar arquivo
      </button>
    }
  >
    <div className="upload-wrapper">
      <label htmlFor="file-upload" className="upload-label">
        Selecione um arquivo
      </label>
      <input
        id="file-upload"
        type="file"
        className="upload-input"
        accept=".pdf,.jpg,.png"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <p className="file-name">Arquivo: {selectedFile.name}</p>
      )}
    </div>
  </Modal>
</>

  );
};

export default AnexoTab;
