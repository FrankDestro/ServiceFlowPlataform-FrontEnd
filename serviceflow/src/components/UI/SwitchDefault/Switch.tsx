import "./Switch.css";

type SwitchProps = {
    name: string;
    checked: boolean;
    defaultChecked?: boolean;
    onChange?: (name: string, checked: boolean) => void;
};

function Switch({ name, checked, defaultChecked, onChange }: SwitchProps) {
    const handleChange = () => {
        onChange?.(name, !checked);
    };

    return (
        <label className="sw-wrap">
            <input
                type="checkbox"
                className="sw-input"
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={handleChange}
            />
            <span className="sw-track">
                <span className="sw-thumb" />
            </span>
        </label>
    );
}

export default Switch;