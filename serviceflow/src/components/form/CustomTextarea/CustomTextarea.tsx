import React from "react";
import "./CustomTextarea.css";

interface CustomTextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    label?: string;
    name?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
    value,
    onChange,
    rows = 4,
    label,
    name,
}) => {
    return (
        <div className="ticket-input-container">
            <textarea
                value={value}
                onChange={onChange}
                rows={rows}
                name={name}
                className="ticket-textarea"
                placeholder=" "
            />
            {label && <label className="floating-label">{label}</label>}
        </div>
    );
};

export default CustomTextarea;