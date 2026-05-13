import { DatePicker } from "antd";
import dayjs from "dayjs";
import "./CustomDatePicker.css"
import ptBR from "antd/es/date-picker/locale/pt_BR";


interface CustomDatePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    showTime?: boolean;
}

function CustomDatePicker({ value, onChange, placeholder, showTime = false }: CustomDatePickerProps) {
    return (
        <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(date) => onChange(date ? date.format(showTime ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD") : "")}
            format={showTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY"}
            locale={ptBR}
            showTime={showTime ? { format: "HH:mm" } : false}
            placeholder={placeholder ?? "Selecione a data"}
            style={{ width: "100%", height: 40, borderRadius: 10 }}
        />
    );
}

export default CustomDatePicker;

