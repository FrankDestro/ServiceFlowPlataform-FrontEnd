import { DatePicker } from "antd";
import dayjs from "dayjs";
import "./CustomDatePicker.css"

interface CustomDatePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}

function CustomDatePicker({ value, onChange, placeholder }: CustomDatePickerProps) {
    return (
        <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(date) => onChange(date ? date.format("YYYY-MM-DD") : "")}
            format="DD/MM/YYYY"
            placeholder={placeholder ?? "Selecione a data"}
            style={{ width: "100%", height: 40, borderRadius: 10 }}
        />
    );
}

export default CustomDatePicker;