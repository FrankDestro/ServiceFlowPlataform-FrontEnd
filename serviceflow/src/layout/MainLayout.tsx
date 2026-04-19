import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/footer";
import NavbarLocation from "./NavbarLocation/NavbarLocation";
import NotificationBell from "./Notification/Notification";
import UserMenu from "./UserMenu/UserMenu";
// ⬅ novo componente
import "./MainLayout.css";
import Sidebar from "./SideBar/SideBar";

const { Header, Content, Footer: AntFooter } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
    } = theme.useToken();

    return (
      <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>

  <Sidebar
    collapsed={collapsed}
    onCollapse={(value) => setCollapsed(value)}
  />

  <Layout>

    {/* HEADER */}
    <Header
      style={{
        padding: "0 20px",
        background: "#ffffff",
        borderBottom: "1px solid #f1f5f9",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={
          collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
        }
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 40,
          height: 40,
          borderRadius: 10,
        }}
      />

      <div className="logo container-header">
        <h1 className="app-title">
          Service<span className="highlight"> Flow </span>Platform
        </h1>

        <div className="container-header-options">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </Header>

    {/* CONTENT */}
    <Content style={{ margin: "20px 20px 0" }}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#ffffff",
          borderRadius: 12,
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
        className="scroll-content"
      >
        <NavbarLocation />
        <div>
          <Outlet />
        </div>
      </div>
    </Content>

    {/* FOOTER */}
    <AntFooter style={{ padding: 0, background: "transparent" }}>
      <Footer />
    </AntFooter>

  </Layout>
</Layout>
    );
};

export default MainLayout;
