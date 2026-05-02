import { useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaCog,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import calendarioIcon from "../../../assets/logo.svg";
import keycloak, * as loginService from "../../modules/Auth/service/auth-keycloak-service";
import "./header.css";

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const navigate = useNavigate();


  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    setShowSettings(false);
  };

  const handleSettingsClick = () => {
    setShowSettings((prev) => !prev);
    setShowNotifications(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      title: "Reunião agendada",
      message: "Sua reunião com o cliente foi agendada para amanhã.",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Alerta de Sistema",
      message: "O sistema será reiniciado em 30 minutos para manutenção.",
      icon: <FaExclamationCircle />,
    },
    {
      title: "Novo Evento Criado",
      message: "Um novo evento foi adicionado ao seu calendário.",
      icon: <FaInfoCircle />,
    },
  ];

  const handleLogout = (_event: React.MouseEvent<HTMLDivElement>) => {
    keycloak.logout
    loginService.logout();
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={calendarioIcon} alt="CalendarioIcon" />
        <h1>Support Service</h1>
      </div>

      {!isLoginPage && (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <nav
            className="nav"
            style={{ display: "flex", alignItems: "center" }}
          >
            <ul>
              <li>
                <a href="/home">opções rapidas</a>
              </li>
            </ul>
          </nav>

          <div
            className="notifications"
            onClick={handleNotificationClick}
            ref={notificationRef}
          >
            <FaBell className="notification-icon" />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
            {showNotifications && (
              <div className="notification-submenu">
                <ul>
                  {notifications.map((notification, index) => (
                    <li key={index} className="notification-item">
                      <div className="notification-icon-container">
                        {notification.icon}
                      </div>
                      <div className="notification-content">
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                        <span className="notification-date">"2025-06-23"</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="view-all">Ver todos</div>
              </div>
            )}
          </div>

          <div
            className="settings"
            onClick={handleSettingsClick}
            ref={settingsRef}
          >
            <FaCog className="settings-icon" />
            {showSettings && (
              <div className="settings-submenu">
                <ul>
                  <li>
                    <span>Meu Perfil </span>
                  </li>
                  <li>
                    <span>Configurações </span>
                  </li>
                  <li>
                    <div onClick={handleLogout}>
                      <span>Sair</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
    </header>
  );
}

export default Header;
