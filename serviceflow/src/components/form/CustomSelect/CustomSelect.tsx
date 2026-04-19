import React, { useState } from "react";
import "./CustomSelect.css";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  options: Option[];
  className?: string;
  width?: string | number;
  height?: string | number;
  hideWrapper?: boolean; // <---- nova prop
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  label,
  options,
  className = "",
  width,
  height,
  hideWrapper = false, // padrão: false
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || value !== "";
  const selectStyle: React.CSSProperties = { width, height };

   if (hideWrapper) {
    // Se quiser sem wrapper, só renderiza o select puro
    return (
      <select
        value={value}
        onChange={onChange}
        className={className}
        style={selectStyle}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

 return (
    <div className={`custom2-select-wrapper ${className}`} style={selectStyle}>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="custom2-select"
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {label && (
        <label className={`custom-select-label ${shouldFloat ? "float" : ""}`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomSelect;
