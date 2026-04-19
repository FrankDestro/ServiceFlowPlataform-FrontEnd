import {
  faClock,
  faDashboard,
  faDatabase,
  faGears,
  faHome,
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
  "/dashboard": { title: "Dashboard", icon: faDashboard },
  "/ticket": { title: "Ticket", icon: faTicket },
  "/ticketdetails": { title: "Detalhes", icon: faTasks, parent: "/ticket" },
  "/user": { title: "User", icon: faUser },
  "/abas": { title: "Abas", icon: faDatabase },
  "/knowErrorDatabase": { title: "KEDB", icon: faDatabase },

  "/settings/general": { title: "General", icon: faGears, parent: "/settings" },
  "/settings/profile": { title: "Profile", icon: faUser, parent: "/settings" },
  "/settings/sla": { title: "SLA", icon: faClock, parent: "/settings" },

  "/test": { title: "Testes", icon: faWarning }
};

const NavbarLocation = () => {
  const location = useLocation();

  const buildBreadcrumb = () => {
    const path = location.pathname;

    const current = routeMap[path];

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