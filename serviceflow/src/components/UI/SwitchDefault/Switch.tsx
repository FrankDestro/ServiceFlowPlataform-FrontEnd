import { Switch as AntSwitch } from "antd";

type SwitchProps = {
  name: string;
  checked: boolean;
  defaultChecked?: boolean;
  onChange?: (name: string, checked: boolean) => void;
  colorChecked?: string; 
  colorUnchecked?: string;
};

function Switch({
  name,
  checked,
  defaultChecked,
  onChange,
  colorChecked = "#11344d", 
  colorUnchecked = "#ccc",
}: SwitchProps) {
  const handleChange = (checked: boolean) => {
    if (onChange) {
      onChange(name, checked);
    }
  };

  return (
    <AntSwitch
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={handleChange}
      style={{
        backgroundColor: checked ? colorChecked : colorUnchecked,
      }}
    />
  );
}

export default Switch;
