import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import KnowErrorDbPage from "./routes/knowErrorDbPage/KnowErrorsPage";
// import GeneralSettings from "./routes/SettingPages/General Settings/GeneralSettingsPage";
// import ProfileSettings from "./routes/SettingPages/ProfileSettings/ProfileSettingsPage";
// import SlaSettings from "./routes/SettingPages/SLA Settings/SlaSettingsPage";
// import SettingsPage from "./routes/SettingsLayout/SettingsLayout";
// import Test from "./routes/Test/Test";
// import User from "./routes/Users/user";
import * as authService from "./modules/Auth/service/auth-keycloak-service.ts";
import MainLayout from "./layout/MainLayout.tsx";
import Home from "./pages/HomePage/home.tsx";
import KnowErrorsPage from "./pages/KnowErrorsPage/KnowErrorsPage.tsx";
import Ticket from "./pages/TicketPage/TicketPage.tsx";
import OperationalPanelPage from "./pages/OperationalPanelPage/OperationalPanelPage.tsx";
import { Toastify } from "./layout/Toastify/Toastify.tsx";
import ApprovalsPage from "./pages/ApprovalsPage/ApprovalsPage.tsx";
import KnowledgeBasePage from "./pages/KnowledgeBasePage/KnowledgeBasePage.tsx";
import ChangePage from "./pages/ChangePage/ChangePage.tsx";
import ChangeDetailPage from "./pages/ChangePageDetail/ChangeDetailPage.tsx";
import ChangeCreate from "./modules/Change/ChangeCreate/ChangeCreate.tsx";

function App() {
  const [keycloakReady, setKeycloakReady] = useState(false);

  useEffect(() => {
    authService
      .initAuth()
      .then(() => setKeycloakReady(true))
      .catch((err) => console.error("Erro ao inicializar Keycloak:", err));
  }, []);

  if (!keycloakReady) return <div>Carregando...</div>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/operationalPanel" element={<OperationalPanelPage />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/approvals" element={<ApprovalsPage />} />
            <Route path="//KnowledgeBase" element={<KnowledgeBasePage />} />
            <Route path="/knowErrorDatabase" element={<KnowErrorsPage />} />
            {/* //MODULO CHANGE */}
            <Route path="/changes" element={<ChangePage />} />
            <Route path="/changes/:id" element={<ChangeDetailPage />} />
            <Route path="/changes/new" element={<ChangeCreate />} />
            {/* <Route path="settings" element={<SettingsPage />}>
      <Route path="general" element={<GeneralSettings />} />
      <Route path="profile" element={<ProfileSettings />} />
      <Route path="sla" element={<SlaSettings />} />
    </Route> */}
            {/* <Route path="/test" element={<Test />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      <Toastify />
    </>
  );
}
export default App;
