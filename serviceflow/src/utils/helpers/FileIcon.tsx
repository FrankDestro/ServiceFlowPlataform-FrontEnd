import React from "react";
import { FaFile, FaFileExcel, FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const getFileIcon = (fileType: string) => {

  switch (fileType) {
    case "pdf":
      return <FaFilePdf size={24} color="#d32f2f" />;
    case "png":
    case "jpg":
    case "jpeg":
      return <FaFileImage size={24} color="#42a5f5" />;
    case "docx":
      return <FaFileWord size={24} color="#4caf50" />;
    case "plain":
      return <FaFile size={24} color="#cccccc"/>;
    case "xlsx":
      return <FaFileExcel size={24} color="#00c853" />;
    default:
      return <FiDownload size={24} color="#757575" />;
  }
};

type Props = {
  type: string;
};

const FileIcon: React.FC<Props> = ({ type }) => {
    const fileType = type?.toLowerCase() ?? "";
    return <div className="icone">{getFileIcon(fileType)}</div>;
};

export default FileIcon;
