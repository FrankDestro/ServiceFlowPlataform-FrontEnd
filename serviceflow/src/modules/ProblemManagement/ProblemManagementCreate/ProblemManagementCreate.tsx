import { useState } from "react";
import "./ProblemManagementCreate.css";
import Button from "../../../components/UI/Button/Button";
import { faSave, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../../../components/form/CustomDatePicker/CustomDatePicker";
import CustomUploadFile from "../../../components/form/CustomUploadFile/CustomUploadFile";
import { RefreshCwIcon, TicketIcon } from "lucide-react";

type TabId = "info" | "tickets" | "mudancas" | "anexos";

function ProblemManagementCreate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("info");
  const [files, setFiles] = useState<File[]>([]);
  const [ticketInput, setTicketInput] = useState("");
  const [ticketTags, setTicketTags] = useState<string[]>([]);
  const [changeInput, setChangeInput] = useState("");
  const [changeTags, setChangeTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    urgency: "",
    categoryId: "",
    affectedServices: "",
    dueDate: "",
    rootCause: "",
    workaround: "",
    resolutionNotes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleTicketKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const val = ticketInput.trim();
    if (!val || ticketTags.includes(val)) return;
    setTicketTags(prev => [...prev, val]);
    setTicketInput("");
  }

  function removeTicketTag(val: string) {
    setTicketTags(prev => prev.filter(t => t !== val));
  }

  function handleChangeKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const val = changeInput.trim();
    if (!val || changeTags.includes(val)) return;
    setChangeTags(prev => [...prev, val]);
    setChangeInput("");
  }

  function removeChangeTag(val: string) {
    setChangeTags(prev => prev.filter(t => t !== val));
  }

  return (
    <div className="pp-wrapper">

      <div className="pp-topbar">
        <div className="pp-topbar-left">
          <div className="pp-back-btn" onClick={() => navigate("/problems")}>←</div>
          <div>
            <div className="pp-page-title">Novo Problema</div>
            <div className="pp-page-sub">Registre um novo problema para investigação</div>
          </div>
        </div>
        <div className="pp-topbar-actions">
          <Button text="Cancelar" icon={faX} type="button" borderRadius="8px" hoverColor="" className="pp-btn-cancel" onClick={() => navigate("/problems")} />
          <Button text="Salvar" icon={faSave} background="#0f766e" hoverColor="#0d9488" type="button" borderRadius="8px" />
        </div>
      </div>

      <div className="pp-tabs-bar">
        <div className={`pp-tab ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>Informações</div>
        <div className={`pp-tab ${activeTab === "tickets" ? "active" : ""}`} onClick={() => setActiveTab("tickets")}>
          Tickets vinculados <span className="pp-tab-badge">{ticketTags.length}</span>
        </div>
        <div className={`pp-tab ${activeTab === "mudancas" ? "active" : ""}`} onClick={() => setActiveTab("mudancas")}>
          Mudanças associadas <span className="pp-tab-badge">{changeTags.length}</span>
        </div>
        <div className={`pp-tab ${activeTab === "anexos" ? "active" : ""}`} onClick={() => setActiveTab("anexos")}>
          Anexos <span className="pp-tab-badge">{files.length}</span>
        </div>
      </div>

      {/* Tab: Informações */}
      <div className={`pp-tab-content ${activeTab === "info" ? "active" : ""}`}>
        <div className="pp-main">

          <div className="pp-card">
            <div className="pp-section-title">Identificação</div>
            <div className="pp-field">
              <label>Título *</label>
              <input type="text" name="title" placeholder="Descreva brevemente o problema" value={formData.title} onChange={handleChange} />
            </div>
            <div className="pp-field">
              <label>Descrição *</label>
              <textarea name="description" placeholder="Descreva detalhadamente o problema..." value={formData.description} onChange={handleChange} />
            </div>
            <div className="pp-field">
              <label>Serviços afetados</label>
              <input type="text" name="affectedServices" placeholder="Ex: Email, VPN, ERP..." value={formData.affectedServices} onChange={handleChange} />
              <div className="pp-hint">Separe por vírgula</div>
            </div>
          </div>

          <div className="pp-card">
            <div className="pp-section-title">Análise</div>
            <div className="pp-field">
              <label>Causa raiz</label>
              <textarea name="rootCause" placeholder="Qual é a causa raiz identificada?" style={{ minHeight: 80 }} value={formData.rootCause} onChange={handleChange} />
            </div>
            <div className="pp-field">
              <label>Workaround</label>
              <textarea name="workaround" placeholder="Existe alguma solução temporária?" style={{ minHeight: 80 }} value={formData.workaround} onChange={handleChange} />
            </div>
            <div className="pp-field">
              <label>Notas de resolução</label>
              <textarea name="resolutionNotes" placeholder="Observações sobre a resolução..." style={{ minHeight: 80 }} value={formData.resolutionNotes} onChange={handleChange} />
            </div>
          </div>

        </div>

        <div className="pp-sidebar">

          <div className="pp-card">
            <div className="pp-section-title">Classificação</div>
            <div className="pp-side-field">
              <span className="pp-side-label">Prioridade *</span>
              <select className="pp-side-select" name="priority" value={formData.priority} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
            <div className="pp-divider" />
            <div className="pp-side-field">
              <span className="pp-side-label">Urgência *</span>
              <select className="pp-side-select" name="urgency" value={formData.urgency} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
            <div className="pp-divider" />
            <div className="pp-side-field">
              <span className="pp-side-label">Categoria *</span>
              <select className="pp-side-select" name="categoryId" value={formData.categoryId} onChange={handleChange}>
                <option value="">Selecione</option>
              </select>
            </div>
          </div>

          <div className="pp-card">
            <div className="pp-section-title">Prazo</div>
            <div className="pp-side-field">
              <CustomDatePicker
                value={formData.dueDate}
                onChange={(val) => setFormData(prev => ({ ...prev, dueDate: val }))}
                placeholder="Selecione o prazo"
              />
            </div>
          </div>

          <div className="pp-card">
            <div className="pp-section-title">Status inicial</div>
            <div className="pp-side-field">
              <span className="pp-side-label">Status</span>
              <select className="pp-side-select" disabled><option>OPEN</option></select>
            </div>
            <div className="pp-hint">Definido automaticamente ao criar</div>
          </div>

        </div>
      </div>

      {/* Tab: Tickets vinculados */}
      <div className={`pp-tab-content ${activeTab === "tickets" ? "active" : ""}`}>
        <div className="pp-main">
          <div className="pp-card">
            <div className="pp-section-title">Vincular tickets</div>
            <div className="pp-field">
              <label>Número do ticket</label>
              <div className="pp-assoc-input-wrap">
                <span className="pp-assoc-icon"><TicketIcon size={16} color="#0ea5e9" /></span>
                <input
                  type="text"
                  placeholder="Ex: TKT-000033"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  onKeyDown={handleTicketKeyDown}
                  style={{ paddingLeft: 32 }}
                />
              </div>
              <div className="pp-hint">Pressione Enter para adicionar</div>
              <div className="pp-assoc-tags" style={{ marginTop: 10 }}>
                {ticketTags.map((tag) => (
                  <span key={tag} className="pp-assoc-tag pp-assoc-ticket">
                    {tag}
                    <button onClick={() => removeTicketTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pp-sidebar">
          <div className="pp-card">
            <div className="pp-section-title">Sobre os tickets</div>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
              Vincule os tickets de incidente que originaram este problema.
            </p>
            <div className="pp-divider" />
            <div className="pp-summary-row">
              <span className="pp-summary-label">Tickets vinculados</span>
              <span className="pp-summary-value">{ticketTags.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab: Mudanças */}
      <div className={`pp-tab-content ${activeTab === "mudancas" ? "active" : ""}`}>
        <div className="pp-main">
          <div className="pp-card">
            <div className="pp-section-title">Associar mudanças</div>
            <div className="pp-field">
              <label>Número da mudança</label>
              <div className="pp-assoc-input-wrap">
                <span className="pp-assoc-icon"><RefreshCwIcon size={16} color="#0f766e" /></span>
                <input
                  type="text"
                  placeholder="Ex: CH-001"
                  value={changeInput}
                  onChange={(e) => setChangeInput(e.target.value)}
                  onKeyDown={handleChangeKeyDown}
                  style={{ paddingLeft: 32 }}
                />
              </div>
              <div className="pp-hint">Pressione Enter para adicionar</div>
              <div className="pp-assoc-tags" style={{ marginTop: 10 }}>
                {changeTags.map((tag) => (
                  <span key={tag} className="pp-assoc-tag pp-assoc-change">
                    {tag}
                    <button onClick={() => removeChangeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pp-sidebar">
          <div className="pp-card">
            <div className="pp-section-title">Sobre as mudanças</div>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
              Associe mudanças relacionadas a este problema.
            </p>
            <div className="pp-divider" />
            <div className="pp-summary-row">
              <span className="pp-summary-label">Mudanças associadas</span>
              <span className="pp-summary-value">{changeTags.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab: Anexos */}
      <div className={`pp-tab-content ${activeTab === "anexos" ? "active" : ""}`}>
        <div className="pp-main">
          <div className="pp-card">
            <div className="pp-section-title">Anexos</div>
            <CustomUploadFile files={files} onFilesChange={setFiles} />
          </div>
        </div>
        <div className="pp-sidebar">
          <div className="pp-card">
            <div className="pp-section-title">Sobre os anexos</div>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
              Adicione arquivos relevantes para o problema.
            </p>
            <div className="pp-divider" />
            <div className="pp-summary-row">
              <span className="pp-summary-label">Arquivos anexados</span>
              <span className="pp-summary-value">{files.length}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProblemManagementCreate;