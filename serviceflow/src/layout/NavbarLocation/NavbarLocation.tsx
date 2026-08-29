import { Activity, Ticket, CheckSquare, BookOpen, AlertTriangle, RefreshCw, Bug, Calendar, Milestone, ListTodo, Repeat, Inbox } from "lucide-react";
import { useLocation } from "react-router-dom";
import "./NavbarLocation.css";
import { HexIcon } from "../../components/UI/HexIcon/HexIcon";
import { BackwardOutlined, DashboardOutlined } from "@ant-design/icons";

type RouteConfig = {
  title: string;
  icon?: any;
  hexIcon?: { icon: any; color: string; bg: string };
  parent?: string;
};

const routeMap: Record<string, RouteConfig> = {

  // TICKET
  "/operationalPanel": { title: "Painel Operacional", hexIcon: { icon: Activity, color: "#475569", bg: "#f1f5f9" } },
  "/ticket": { title: "Gerenciamento de Tickets", hexIcon: { icon: Ticket, color: "#0369a1", bg: "#dbeafe" } },
  "/ticketdetails": { title: "Detalhes", hexIcon: { icon: Ticket, color: "#0369a1", bg: "#dbeafe" }, parent: "/ticket" },
  "/approvals": { title: "Aprovações", hexIcon: { icon: CheckSquare, color: "#0369a1", bg: "#dbeafe" } },
  "/KnowledgeBase": { title: "Base de Conhecimento", hexIcon: { icon: BookOpen, color: "#d97706", bg: "#fef3c7" } },
  "/knowErrorDatabase": { title: "Erros Conhecidos", hexIcon: { icon: AlertTriangle, color: "#d97706", bg: "#fef3c7" } },

  // CHANGE
  "/changes": { title: "Gerenciamento de Mudanças", hexIcon: { icon: RefreshCw, color: "#0f766e", bg: "#ccfbf1" } },
  "/changes/:id": { title: "Detalhes da Mudança", hexIcon: { icon: RefreshCw, color: "#0f766e", bg: "#ccfbf1" }, parent: "/changes" },
  "/changes/new": { title: "Nova Mudança", hexIcon: { icon: RefreshCw, color: "#0f766e", bg: "#ccfbf1" }, parent: "/changes" },

  //PROBLEM
  "/problems": { title: "Gerenciamento de Problemas", hexIcon: { icon: Bug, color: "#7c3aed", bg: "#ede9fe" } },
  "/problems/:id": { title: "Detalhes do Problema", hexIcon: { icon: Bug, color: "#7c3aed", bg: "#ede9fe" }, parent: "/problems" },
  "/problems/new": { title: "Registrar novo problema", hexIcon: { icon: Bug, color: "#7c3aed", bg: "#ede9fe" }, parent: "/problems" },

  // OPERATIONAL TASK
  "/tarefas-operacionais": { title: "Tarefas Operacionais", hexIcon: { icon: Calendar, color: "#0f766e", bg: "#ccfbf1" } },
  "/tarefas-operacionais/:id": { title: "Detalhes da Tarefa Operacional", hexIcon: { icon: Calendar, color: "#0f766e", bg: "#ccfbf1" }, parent: "/tarefas-operacionais" },
  "/tarefas-operacionais/new": { title: "Nova Tarefa Operacional", hexIcon: { icon: Calendar, color: "#0f766e", bg: "#ccfbf1" }, parent: "/tarefas-operacionais" },


  // PROJECT
  "/epicos": { title: "Épicos", hexIcon: { icon: Milestone, color: "#0369a1", bg: "#dbeafe" } },
  "/epics/:id": { title: "Detalhes do Épico", hexIcon: { icon: Milestone, color: "#0369a1", bg: "#dbeafe" }, parent: "/epicos" },
  "/tasks": { title: "Tasks", hexIcon: { icon: ListTodo, color: "#0369a1", bg: "#dbeafe" } },
  "/tasks/:id": { title: "Detalhes da task", hexIcon: { icon: ListTodo, color: "#0369a1", bg: "#dbeafe" }, parent: "/tasks" },
  "/sprints": { title: "Sprints", hexIcon: { icon: Repeat, color: "#0369a1", bg: "#dbeafe" } },
  "/sprints/:id": { title: "Detalhes da Sprint", hexIcon: { icon: Repeat, color: "#0369a1", bg: "#dbeafe" }, parent: "/sprints" },
  "/backlog": { title: "Tarefas em Backlog", hexIcon: { icon: Inbox, color: "#0369a1", bg: "#dbeafe" } },

  "/home": { title: "Home" },
  "/dashboard": { title: "Dashboard" },

};

const NavbarLocation = () => {
  const location = useLocation();

  const buildBreadcrumb = () => {
    const path = location.pathname;

    let current = routeMap[path];

    if (!current) {
      const matchedKey = Object.keys(routeMap).find((key) => {
        const pattern = key.replace(/:[\w]+/g, "[^/]+");
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(path);
      });
      if (matchedKey) current = routeMap[matchedKey];
    }

    if (!current) {
      return [{ title: "Unknown", icon: null }];
    }

    const breadcrumb = [current];

    if (current.parent && routeMap[current.parent]) {
      breadcrumb.unshift(routeMap[current.parent]);
    }

    return breadcrumb;
  };

  const breadcrumb = buildBreadcrumb();

  return (
    <div className="container-navbar-location">
      <div className="container-content-navbar-location">
        {breadcrumb.map((item, index) => (
          <div key={index} className="breadcrumb-item">

            {item.hexIcon && index === 0 && (
              <HexIcon icon={item.hexIcon.icon} color={item.hexIcon.color} bg={item.hexIcon.bg} />
            )}
            <span className={index === breadcrumb.length - 1 ? "active" : ""}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarLocation;