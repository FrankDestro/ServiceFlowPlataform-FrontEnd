import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ChangeCreate from "./modules/Change/ChangeCreate/ChangeCreateForm.tsx";
import ManagementProblemPage from "./pages/Problem/ManagementProblemPage/ManagementProblemPage.tsx";
import ManagementProblemPageDetail from "./pages/Problem/ManagementProblemPageDetail/ManagementProblemPageDetail.tsx";
import ProblemManagementCreate from "./modules/ProblemManagement/ProblemManagementCreate/ProblemManagementCreate.tsx";
import OperationalTaskPage from "./pages/OperationalTaskPage/OperationalTaskPage.tsx";
import OperatonalPageDetail from "./pages/OperationalPageDetail/OperatonalPageDetail.tsx";
import ProjectPage from "./pages/ProjectPage/ProjectPage.tsx";
import EpicDetailPage from "./pages/EpicDetailPage/EpicDetailPage.tsx";

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
            <Route path="/KnowledgeBase" element={<KnowledgeBasePage />} />
            <Route path="/knowErrorDatabase" element={<KnowErrorsPage />} />
            {/* //MODULO CHANGE */}
            <Route path="/changes" element={<ChangePage />} />
            <Route path="/changes/:id" element={<ChangeDetailPage />} />
            <Route path="/changes/new" element={<ChangeCreate />} />
            {/* //MODULO PROBLEM */}
            <Route path="/problems" element={<ManagementProblemPage />} />
            <Route path="/problems/:id" element={<ManagementProblemPageDetail />} />
            <Route path="/problems/new" element={<ProblemManagementCreate />} />
            {/* //MODULO OPERATIONAL TASK */}
            <Route path="/tarefas-operacionais" element={<OperationalTaskPage />} />
            <Route path="/tarefas-operacionais/:id" element={<OperatonalPageDetail />} />
              {/* //MODULO PROJECT */}
            <Route path="/epicos" element={<ProjectPage />} />
            <Route path="/epics/:id" element={<EpicDetailPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toastify />
    </>
  );
}
export default App;
