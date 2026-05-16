import {
  faBook,
  faClipboardCheck,
  faClock,
  faDashboard,
  faDatabase,
  faGears,
  faHome,
  faNewspaper,
  faRefresh,
  faTasks,
  faTicket,
  faUser,
  faWarning
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

import "./NavbarLocation.css";

type RouteConfig = {
  title: string;
  icon: any;
  parent?: string;
};

const routeMap: Record<string, RouteConfig> = {
  // ── GERAL ──────────────────────────────────────────────
  "/home": { title: "Home", icon: faHome },
  "/dashboard": { title: "Dashboard", icon: faDashboard },
  "/settings/general": { title: "General", icon: faGears, parent: "/settings" },
  "/settings/profile": { title: "Profile", icon: faUser, parent: "/settings" },
  "/settings/sla": { title: "SLA", icon: faClock, parent: "/settings" },

  // ── TICKET ─────────────────────────────────────────────
  "/operationalPanel": { title: "Painel Operacional", icon: faDashboard },
  "/ticket": { title: "Gerenciamento de Tickets", icon: faTicket },
  "/ticketdetails": { title: "Detalhes", icon: faTasks, parent: "/ticket" },
  "/approvals": { title: "Aprovações", icon: faClipboardCheck },
  "/KnowledgeBase": { title: "Base de Conhecimento", icon: faBook },
  "/knowErrorDatabase": { title: "Erros Conhecidos", icon: faDatabase },

  // ── CHANGE ─────────────────────────────────────────────
  "/changes": { title: "Gerenciamento de Mudanças", icon: faRefresh },
  "/changes/:id": { title: "Detalhes da Mudança", icon: faRefresh },
  "/changes/new": { title: "Nova Mudança", icon: faNewspaper },

  // ── PROBLEM ────────────────────────────────────────────
  "/problems": { title: "Gerenciamento de Problemas", icon: faDatabase },
  "/problems/:id": { title: "Detalhes do Problema", icon: faDatabase },

  // ── OUTROS ─────────────────────────────────────────────
  "/abas": { title: "Abas", icon: faDatabase },
  "/test": { title: "Testes", icon: faWarning },
};

const NavbarLocation = () => {
  const location = useLocation();

  const buildBreadcrumb = () => {
    const path = location.pathname;

    // tenta match exato primeiro
    let current = routeMap[path];

    // se não achou, tenta match dinâmico com :id
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
            {item.icon && index === breadcrumb.length - 1 && (
              <FontAwesomeIcon icon={item.icon} className="navbar-icon" />
            )}

            <span className={index === breadcrumb.length - 1 ? "active" : ""}>
              {item.title}
            </span>

            {index < breadcrumb.length - 1 && (
              <span className="separator">/</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarLocation;