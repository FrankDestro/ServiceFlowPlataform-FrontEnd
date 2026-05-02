import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import FileIcon from "../../../utils/helpers/FileIcon";
import "./CustomUploadFile.css";

interface CustomFileUploadProps {
    label?: string;
    files: File[];
    onFilesChange: (files: File[]) => void;
}

const CustomUploadFile: React.FC<CustomFileUploadProps> = ({
    label = "📎 Anexar Arquivos",
    files,
    onFilesChange,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            onFilesChange([...files, ...selectedFiles]);
        }
    };

    const handleRemove = (index: number) => {
        onFilesChange(files.filter((_, i) => i !== index));
    };

    return (
        <div className="custom-upload-container">
            <label htmlFor="fileUpload" className="custom-upload-btn">
                {label}
            </label>
            <input
                type="file"
                id="fileUpload"
                multiple
                hidden
                onChange={handleFileChange}
            />
            <div className="custom-upload-file-list">
                {files.map((file, index) => (
                    <div className="custom-upload-file-chip" key={index}>
                        <FileIcon type={file.type.split("/")[1]} />
                        <span>{file.name}</span>
                        <button
                            type="button"
                            className="custom-upload-remove-btn"
                            onClick={() => handleRemove(index)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomUploadFile;