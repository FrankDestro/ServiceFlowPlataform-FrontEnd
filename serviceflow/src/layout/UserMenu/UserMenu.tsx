import { Dropdown } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import * as authService from "../../modules/Auth/service/auth-keycloak-service";
import "./UserMenu.css";

export default function UserMenu() {

    const items: MenuProps["items"] = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "Meu Perfil",
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Configurações",
        },
        { type: "divider" },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Sair",
            danger: true,
        },
    ];

    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
        if (key === "settings") {
            console.log("Ir para CONFIGURAÇÕES");
        }
        if (key === "logout") {
            authService.logout();
        }
    };

    return (
        <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
            placement="bottomRight"
        >
            <div className="h-avatar">FS</div>
        </Dropdown>
    );
}