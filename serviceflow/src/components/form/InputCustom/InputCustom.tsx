import React, { useState } from "react";
import "./InputCustom.css";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  type = "text",
  label,
  className = "",
  width,
  height,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle: React.CSSProperties = { width, height };
  const shouldFloat = isFocused || value.length > 0;

  return (
    <div className={`custom2-input-wrapper ${className}`} style={inputStyle}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="custom2-input"
        {...rest}
      />
      <label className={`custom2-label ${shouldFloat ? "float" : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
