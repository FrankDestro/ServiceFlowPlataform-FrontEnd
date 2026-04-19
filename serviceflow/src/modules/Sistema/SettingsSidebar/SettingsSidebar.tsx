import { faClock, faGears, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import './SettingsSidebar.css';

function SettingsSidebar() {
    return (
        <div>
            <div className="container-sidebar-settings">
                <h2>Categorias</h2>
                <div className="container-sidebar-options-settings">
                    <NavLink
                        to="general"
                        className={({ isActive }) =>
                            isActive ? "active-link-sidebar-settings" : ""
                        }
                    >
                        <FontAwesomeIcon icon={faGears} className="icon-sidebar-settings" />
                        General
                    </NavLink>
                    <NavLink
                        to="profile"
                        className={({ isActive }) =>
                            isActive ? "active-link-sidebar-settings" : ""
                        }
                    >
                        <FontAwesomeIcon icon={faUserAlt} className="icon-sidebar-settings" />
                        Perfil
                    </NavLink>
                    <NavLink
                        to="sla"
                        className={({ isActive }) =>
                            isActive ? "active-link-sidebar-settings" : ""
                        }
                    >
                        <FontAwesomeIcon icon={faClock} className="icon-sidebar-settings" />
                        SLA
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SettingsSidebar
