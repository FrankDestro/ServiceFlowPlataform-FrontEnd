import { Badge, Dropdown, Menu } from "antd";
import { BellOutlined } from "@ant-design/icons";

const notifications = [
  {
    title: "Reunião agendada",
    message: "Sua reunião com o cliente foi agendada.",
  },
  {
    title: "Alerta do Sistema",
    message: "Manutenção programada em 30 minutos.",
  },
  {
    title: "Novo Evento",
    message: "Novo evento adicionado ao calendário.",
  },
];

export default function NotificationBell() {
  const menu = (
    <Menu>
      {notifications.map((n, index) => (
        <Menu.Item key={index}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>{n.title}</strong>
            <span style={{ fontSize: "12px", color: "#666" }}>{n.message}</span>
          </div>
        </Menu.Item>
      ))}

      <Menu.Divider />

      <Menu.Item key="view-all">
        <strong style={{ textAlign: "center", display: "block" }}>
          Ver todas
        </strong>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <Badge count={notifications.length}>
        <BellOutlined style={{ fontSize: 22, cursor: "pointer" }} />
      </Badge>
    </Dropdown>
  );
}
