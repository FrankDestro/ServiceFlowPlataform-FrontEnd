import {
  faBook,
  faClipboardCheck,
  faClock,
  faDashboard,
  faDatabase,
  faGears,
  faHome,
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
  "/home": { title: "Home", icon: faHome },
  "/operationalPanel": { title: "Painel Operacional", icon: faDashboard },
  "/dashboard": { title: "Dashboard", icon: faDashboard },
  "/ticket": { title: "Ticket", icon: faTicket },
  "/ticketdetails": { title: "Detalhes", icon: faTasks, parent: "/ticket" },
  "/user": { title: "User", icon: faUser },
  "/abas": { title: "Abas", icon: faDatabase },
  "/KnowledgeBase": { title: "Knowledge Data Base", icon: faBook },
  "/changes": { title: "Solicitações de Mudanças", icon: faRefresh },
  "/changes/:id": { title: "Detalhes da Mudança", icon: faRefresh },
  "/knowErrorDatabase": { title: "Know Error Data Base", icon: faDatabase },
  "/approvals": { title: "Aprovações", icon: faClipboardCheck },
  "/settings/general": { title: "General", icon: faGears, parent: "/settings" },
  "/settings/profile": { title: "Profile", icon: faUser, parent: "/settings" },
  "/settings/sla": { title: "SLA", icon: faClock, parent: "/settings" },

  "/test": { title: "Testes", icon: faWarning }
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