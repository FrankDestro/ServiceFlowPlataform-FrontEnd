import { Dropdown } from "antd";
import { BellOutlined, InfoCircleOutlined, WarningOutlined, CalendarOutlined, CheckOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import "./Notification.css";

type Notification = {
  id: number;
  type: "info" | "warning" | "event";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const notifications: Notification[] = [
  {
    id: 1,
    type: "event",
    title: "Reunião agendada",
    message: "Sua reunião com o cliente foi agendada para amanhã às 10h.",
    time: "há 5 min",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Alerta do Sistema",
    message: "Manutenção programada em 30 minutos. Salve seu trabalho.",
    time: "há 18 min",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Novo Evento",
    message: "Novo evento adicionado ao calendário pela equipe de TI.",
    time: "há 1h",
    read: true,
  },
];

const iconMap = {
  info: <InfoCircleOutlined style={{ color: "#185fa5" }} />,
  warning: <WarningOutlined style={{ color: "#d97706" }} />,
  event: <CalendarOutlined style={{ color: "#0f6e56" }} />,
};

const bgMap = {
  info: "#e6f1fb",
  warning: "#fffbeb",
  event: "#f0fdfa",
};

const unreadCount = notifications.filter(n => !n.read).length;

export default function NotificationBell() {

  const items: MenuProps["items"] = [
    {
      key: "header",
      label: (
        <div className="notif-header">
          <span className="notif-header-title">Notificações</span>
          {unreadCount > 0 && (
            <span className="notif-mark-all">
              <CheckOutlined style={{ fontSize: 10 }} /> Marcar todas como lidas
            </span>
          )}
        </div>
      ),
      disabled: true,
    },
    { type: "divider" as const },
    ...notifications.map(n => ({
      key: n.id.toString(),
      label: (
        <div className={`notif-item ${!n.read ? "unread" : ""}`}>
          <div className="notif-icon-wrap" style={{ background: bgMap[n.type] }}>
            {iconMap[n.type]}
          </div>
          <div className="notif-content">
            <div className="notif-title">{n.title}</div>
            <div className="notif-message">{n.message}</div>
            <div className="notif-time">{n.time}</div>
          </div>
          {!n.read && <div className="notif-dot" />}
        </div>
      ),
    })),
    { type: "divider" as const },
    {
      key: "view-all",
      label: <div className="notif-view-all">Ver todas as notificações</div>,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"

    >
      <div className="h-btn">
        {unreadCount > 0 && (
          <div className="h-badge">{unreadCount}</div>
        )}
        <BellOutlined style={{ fontSize: 16, color: "#64748b" }} />
      </div>
    </Dropdown>
  );
}