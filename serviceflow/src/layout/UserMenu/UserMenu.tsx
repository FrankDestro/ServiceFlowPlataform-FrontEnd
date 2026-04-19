import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import * as authService from "../../modules/Auth/service/auth-keycloak-service";

export default function UserMenu() {
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "settings") {
      console.log("Ir para CONFIGURAÇÕES");
      // navigate("/settings");
    }

    if (key === "logout") {
      authService.logout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Meu Perfil
      </Menu.Item>

      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Configurações
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <Avatar
        size={40}
        style={{ cursor: "pointer", backgroundColor: "#1677ff" }}
        icon={<UserOutlined />}
      />
    </Dropdown>
  );
}
