import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label,
  className = "",
  width,
  height,
  placeholder = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || !!value;

  const containerStyle: React.CSSProperties = { width, height };

  return (
    <div className={`custom-datepicker-wrapper ${className}`} style={containerStyle}>
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        onCalendarOpen={() => setIsFocused(true)}
        onCalendarClose={() => setIsFocused(false)}
        placeholderText={placeholder}
        className="custom-datepicker-input"
        dateFormat="yyyy-MM-dd"
      />
      <label className={`custom-datepicker-label ${shouldFloat ? "float" : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default CustomDatePicker;
