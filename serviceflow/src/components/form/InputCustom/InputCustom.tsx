import React from "react";
import "./InputCustom.css";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    type?: string;
}

const InputCustom: React.FC<CustomInputProps> = ({
    value,
    onChange,
    type = "text",
    label,
    ...rest
}) => {
    return (
        <div className="ticket-input-container">
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="floating-input"
                placeholder=" "
                {...rest}
            />
            {label && <label className="floating-label">{label}</label>}
        </div>
    );
};

export default InputCustom;