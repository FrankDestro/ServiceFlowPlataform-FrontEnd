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
    ToolOutlined
} from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import Logo from "../../assets/logo.svg";

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
        getItem("Chamados", "/ticket", <FileTextOutlined />),
        getItem("Aprovações", "/aprovacoes", <InteractionOutlined />),
        getItem("Base de Conhecimento", "/kb", <BookOutlined />),
        getItem("KEDB (Erros Conhecidos)", "/knowErrorDatabase", <DatabaseOutlined />),
    ]),

    // ── OPERAÇÕES DE TI ───────────────────────────────────────
    getItem("Operações de TI", "ops", <ApiOutlined />, [
        getItem("Problemas", "/problemas", <BugOutlined />),
        getItem("Mudanças", "/mudancas", <ToolOutlined />),
        getItem("Releases", "/releases", <RocketOutlined />),
        getItem("Tarefas Operacionais", "/tarefas-operacionais", <ScheduleOutlined />),
    ]),

    // ── PROJETOS ──────────────────────────────────────────────
    getItem("Projetos", "projetos", <AppstoreOutlined />, [
        getItem("Boards", "/boards", <ColumnWidthOutlined />),
        getItem("Sprints", "/sprints", <DashboardOutlined />),
        getItem("Tarefas", "/tasks", <CheckSquareOutlined />),
    ]),

    // ── ATIVOS & CMDB ─────────────────────────────────────────
    getItem("Ativos & CMDB", "cmdb", <HddOutlined />, [
        getItem("Ativos", "/ativos", <DesktopOutlined />),
        getItem("Inventário", "/inventario", <BarsOutlined />),
        getItem("CMDB", "/cmdb-core", <ApartmentOutlined />),
        getItem("Relacionamentos", "/relacionamentos", <BranchesOutlined />),
        getItem("Contratos / Garantias", "/contratos", <SolutionOutlined />),
    ]),

    // ── RELATÓRIOS ────────────────────────────────────────────
    getItem("Relatórios", "relatorios", <LineChartOutlined />, [
        getItem("Dashboards", "/dashboards", <PieChartOutlined />),
        getItem("SLAs", "/slas", <ClockCircleOutlined />),
        getItem("Tendências", "/tendencias", <AreaChartOutlined />),
    ]),

    // ── ADMINISTRAÇÃO ─────────────────────────────────────────
    getItem("Administração", "admin", <SettingOutlined />, [
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
            </div>
            <Menu
                theme="dark"
                defaultSelectedKeys={["/chamados"]}
                mode="inline"
                items={items}
                className="custom-menu"
                onClick={({ key }) => navigate(key)}
            />
        </Sider>
    );
};

export default Sidebar;