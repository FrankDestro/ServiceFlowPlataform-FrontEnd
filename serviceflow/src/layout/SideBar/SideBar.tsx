import {
    ApartmentOutlined,
    ApiOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
    AreaChartOutlined,
    BarsOutlined,
    BookOutlined,
    BranchesOutlined,
    BugOutlined,
    CheckSquareOutlined,
    ClockCircleOutlined,
    ColumnWidthOutlined,
    CustomerServiceOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    DesktopOutlined,
    FieldTimeOutlined,
    FileSearchOutlined,
    FileTextOutlined,
    HddOutlined,
    InteractionOutlined,
    LineChartOutlined,
    PieChartOutlined,
    RocketOutlined,
    ScheduleOutlined,
    SettingOutlined,
    SolutionOutlined,
    TeamOutlined,
    ToolOutlined,
    UnorderedListOutlined,
    BarChartOutlined
} from "@ant-design/icons";

import { Layout, Menu, type MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import Logo from "../../assets/logo-icon.png";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

export const items: MenuItem[] = [

    // ── ATENDIMENTO ───────────────────────────────────────────
    getItem("Atendimento", "atendimento", <CustomerServiceOutlined />, [
        getItem("Painel Operacional", "/operationalPanel", <DashboardOutlined />),
        getItem("Chamados", "/ticket", <FileTextOutlined />),
        getItem("Aprovações", "/approvals", <InteractionOutlined />),
        getItem("Base de Conhecimento", "/KnowledgeBase", <BookOutlined />),
        getItem("KEDB (Erros Conhecidos)", "/knowErrorDatabase", <DatabaseOutlined />),
    ]),

    { type: "divider" },

    // ── OPERAÇÕES DE TI ───────────────────────────────────────
    getItem("Operações de TI", "ops", <ApiOutlined />, [
        getItem("Problemas", "/problems", <BugOutlined />),
        getItem("Mudanças", "/changes", <ToolOutlined />),
        getItem("Releases", "/releases", <RocketOutlined />),
        getItem("Tarefas Operacionais", "/tarefas-operacionais", <ScheduleOutlined />),
    ]),

    { type: "divider" },

    // ── PROJETOS ──────────────────────────────────────────────
    getItem("Projetos", "projetos", <AppstoreOutlined />, [
        getItem("Boards", "/boards", <ColumnWidthOutlined />),
        getItem("Sprints", "/sprints", <DashboardOutlined />),
        getItem(<span>Backlog <span style={{ fontSize: 10, background: "#e0f2fe", color: "#0369a1", padding: "1px 6px", borderRadius: 4, marginLeft: 4 }}>Em breve</span></span>, "/backlog", <UnorderedListOutlined />),
        getItem("Tarefas", "/tasks", <CheckSquareOutlined />),
        getItem(<span>Épicos <span style={{ fontSize: 10, background: "#ede9fe", color: "#7c3aed", padding: "1px 6px", borderRadius: 4, marginLeft: 4 }}>Em breve</span></span>, "/epicos", <ApartmentOutlined />),
        getItem(<span>Relatórios <span style={{ fontSize: 10, background: "#dcfce7", color: "#16a34a", padding: "1px 6px", borderRadius: 4, marginLeft: 4 }}>Em breve</span></span>, "/relatorios", <BarChartOutlined />),
    ]),

    { type: "divider" },

    // ── ATIVOS & CMDB ─────────────────────────────────────────
    getItem(
        <span>Ativos & CMDB <span style={{ fontSize: 10, background: "#e0f2fe", color: "#0369a1", padding: "1px 6px", borderRadius: 4, marginLeft: 4 }}>v2</span></span>,
        "cmdb", <HddOutlined />, [
        getItem("Ativos", "/ativos", <DesktopOutlined />),
        getItem("Inventário", "/inventario", <BarsOutlined />),
        getItem("CMDB", "/cmdb-core", <ApartmentOutlined />),
        getItem("Relacionamentos", "/relacionamentos", <BranchesOutlined />),
        getItem("Contratos / Garantias", "/contratos", <SolutionOutlined />),
    ]),

    { type: "divider" },

    getItem(
        <span>Relatórios <span style={{ fontSize: 10, background: "#e0f2fe", color: "#0369a1", padding: "1px 6px", borderRadius: 4, marginLeft: 4 }}>v2</span></span>,
        "relatorios", <LineChartOutlined />, [
        getItem("Dashboards", "/dashboards", <PieChartOutlined />),
        getItem("SLAs", "/slas", <ClockCircleOutlined />),
        getItem("Tendências", "/tendencias", <AreaChartOutlined />),
    ]),

    { type: "divider" },

    getItem(
        <span>Administração <span style={{ fontSize: 10, background: "#e0f2fe", color: "#0369a1", padding: "1px 6px", borderRadius: 4, marginLeft: 4 }}>v2</span></span>,
        "admin", <SettingOutlined />, [
        getItem("Usuários & Grupos", "/usuarios", <TeamOutlined />),
        getItem("Catálogo de Serviços", "/catalogo-servicos", <AppstoreAddOutlined />),
        getItem("Workflows / Automação", "/workflows", <BranchesOutlined />),
        getItem("SLAs / Horários", "/slas-admin", <FieldTimeOutlined />),
        getItem("Integrações", "/integracoes", <ApiOutlined />),
        getItem("Logs do Sistema", "/logs", <FileSearchOutlined />),
    ]),
];

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            trigger={null}
            width={280}
            collapsedWidth={90}
        >
            <div className="container-logo">
                <img src={Logo} alt="Logo" />
                <span className="sidebar-brand" style={{
                    opacity: collapsed ? 0 : 1,
                    maxWidth: collapsed ? 0 : 200,
                    overflow: 'hidden',
                    transition: 'opacity 0.25s ease, max-width 0.25s ease',
                }}>
                    Service<span>Flow</span>
                </span>
            </div>
            <Menu
                theme="dark"
                defaultSelectedKeys={["/chamados"]}
                mode="inline"
                items={items}
                className="custom-menu"
                onClick={({ key }) => navigate(key)}
            />

            <div className={`sidebar-user ${collapsed ? "collapsed" : ""}`}>
                <div className="sidebar-user-avatar">FS</div>
                <div className="sidebar-user-info" style={{
                    opacity: collapsed ? 0 : 1,
                    width: collapsed ? 0 : 'auto',
                    overflow: 'hidden',
                    transition: 'opacity 0.25s ease, width 0.25s ease',
                }}>
                    <span className="sidebar-user-name">Frank Silva</span>
                    <span className="sidebar-user-role">Suporte N1</span>
                </div>
            </div>

        </Sider>
    );
};

export default Sidebar;