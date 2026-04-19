import React, { useState } from "react";
import "./CustomTextarea.css";

interface CustomTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
  label?: string;
  width?: string | number;
  height?: string | number;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className = "",
  resize = "none",
  label = "",
  width,
  height,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const wrapperStyle: React.CSSProperties = {
    width,
    height,
  };

  const shouldFloat = isFocused || value.length > 0;

  return (
    <div className={`custom-text-area-wrapper ${className}`} style={wrapperStyle}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{ resize }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="custom-text-area textarea"
      />
      <label className={`custom-text-area-label ${shouldFloat ? "float" : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default CustomTextarea;
