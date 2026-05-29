import { faTicket } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/UI/Button/Button";
import { useTicketForm } from "../hooks/useTicketForm";
import "./TicketFormCreate.css";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect";
import TiptapEditor from "../../../components/form/TiptapEditor/TiptapEditor";
import { useEffect, useState } from "react";
import { TicketIcon } from "lucide-react";
import useTicketActions from "../hooks/useTicketActions";

type AssocTag = {
    id: string;
    value: string;
    type: "ticket";
};

function TicketFormCreate() {
    const {
        typeRequests,
        categories,
        subCategories,
        solvingArea,
        urgencies,
        impacts,
        formData,
        attachedFiles,
        isSubmitting,
        handleChange,
        handleDescriptionChange,
        handleSubmit,
        setAttachedFiles,
        loadingSubCategories,
    } = useTicketForm(() => setEditorKey(prev => prev + 1));

    const [editorKey, setEditorKey] = useState(0);
    const [ticketInput, setTicketInput] = useState("");
    const [ticketSearch, setTicketSearch] = useState<string | null>(null);
    const [assocTags, setAssocTags] = useState<AssocTag[]>([]);
    const { data: ticketData, error } = useTicketActions(ticketSearch);
    const [ticketError, setTicketError] = useState("");

    async function handleAssoc(e: React.KeyboardEvent<HTMLInputElement>, type: "ticket") {
        if (e.key !== "Enter") return;
        e.preventDefault();

        const val = type === "ticket" ? ticketInput.trim() : "";
        if (!val) return;
        if (type === "ticket") {
            setTicketSearch(val);
            return;
        }
        setAssocTags((prev) => [...prev, { id: Date.now().toString(), value: val, type }]);
    }

    function removeAssocTag(id: string) {
        setAssocTags((prev) => prev.filter((t) => t.id !== id));
    }

    useEffect(() => {
        if (!ticketData) return;

        const jaExiste = assocTags.some(t => t.type === "ticket" && t.value === ticketSearch);
        if (jaExiste) {
            setTicketError("Ticket já adicionado.");
            setTicketInput("");
            setTicketSearch(null);
            const timer = setTimeout(() => setTicketError(""), 3000);
            return () => clearTimeout(timer);
        }

        setAssocTags((prev) => [...prev, { id: Date.now().toString(), value: ticketSearch!, type: "ticket" }]);
        setTicketInput("");
        setTicketError("");
        setTicketSearch(null);
    }, [ticketData]);

    useEffect(() => {
        if (!error) return;
        setTicketError("Ticket não encontrado.");
        setTicketSearch(null);
        const timer = setTimeout(() => setTicketError(""), 3000);
        return () => clearTimeout(timer);
    }, [error]);

    return (
        <div className="ticket-form-card">
            <form onSubmit={(e) => handleSubmit(e, assocTags)}>
                <div className="ticket-form-container">

                    {/* ── Linha 1 — Assunto + Categoria + Referência ── */}
                    <div className="ticket-form-row">
                        <div className="ticket-input-container">
                            <input
                                type="text"
                                placeholder=" "
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="floating-input"

                            />
                            <label className="floating-label">Assunto / Título</label>
                        </div>

                        <div className="ticket-select-container">
                            <CustomSelect
                                label="Categoria"
                                name="categoryTicket"
                                value={formData.categoryTicket ?? ""}
                                onChange={handleChange}
                                options={
                                    loadingSubCategories
                                        ? [{ value: "", label: "Carregando..." }]
                                        : (categories ?? []).map((cat: any) => ({
                                            value: String(cat.id),
                                            label: cat.name,
                                        }))
                                }
                            />
                        </div>

                        <div className="ticket-input-container">
                            <input
                                type="text"
                                value={solvingArea?.name ?? ""}
                                name="solvingArea"
                                readOnly
                                placeholder="Área solucionadora (preenchido automaticamente)"
                                className="floating-input"
                                onChange={handleChange}
                            />

                        </div>

                        {/* TICKET RELACIONADOS */}
                        <div className="ticket-input-container">
                            <div className="cc-assoc-input-wrap">
                                <span className="cc-assoc-icon"><TicketIcon size={16} color="#0ea5e9" /></span>
                                <input
                                    type="text"
                                    placeholder="Ex: TKT-000001"
                                    value={ticketInput}
                                    onChange={(e) => { setTicketInput(e.target.value); setTicketError(""); }}
                                    onKeyDown={(e) => handleAssoc(e, "ticket")}
                                />
                                <label className="floating-label">Tickets Relacionados</label>
                            </div>
                            {ticketError && <span style={{ color: "#dc2626", fontSize: 11 }}>{ticketError}</span>}
                            <div className="cc-assoc-tags">
                                {assocTags.filter((t) => t.type === "ticket").map((tag) => (
                                    <span key={tag.id} className="cc-assoc-tag cc-assoc-ticket">
                                        {tag.value}
                                        <button onClick={() => removeAssocTag(tag.id)}>×</button>
                                    </span>
                                ))}
                            </div>
                            <div className="cc-hint">Pressione Enter para adicionar</div>
                        </div>
                    </div>

                    {/* SUBCATEGORY */}
                    <CustomSelect
                        label="Serviços"
                        name="subCategoryTicket"
                        value={formData.subCategoryTicket ?? ""}
                        onChange={handleChange}
                        options={
                            loadingSubCategories
                                ? [{ value: "", label: "Carregando..." }]
                                : (subCategories ?? []).map((subCat: any) => ({
                                    value: String(subCat.id),
                                    label: subCat.name,
                                }))
                        }
                    />

                    {/* ── Linha 2 — Tipo + Urgência + Impacto ── */}
                    <div className="ticket-form-row">
                        <div className="ticket-select-container">
                            <CustomSelect
                                label="Tipo de Solicitação"
                                name="typeRequest"
                                value={formData.typeRequest ?? ""}
                                onChange={handleChange}
                                options={
                                    loadingSubCategories
                                        ? [{ value: "", label: "Carregando..." }]
                                        : (typeRequests ?? []).map((type: any) => ({
                                            value: String(type.id),
                                            label: type.requiresApproval
                                                ? `${type.name} ⚠️ Requer Aprovação`
                                                : type.name,
                                        }))
                                }
                            />
                        </div>

                        <div className="ticket-select-container">
                            <CustomSelect
                                label="Urgência"
                                name="urgency"
                                value={formData.urgency ?? ""}
                                onChange={handleChange}
                                options={
                                    loadingSubCategories
                                        ? [{ value: "", label: "Carregando..." }]
                                        : (urgencies ?? []).map((urgency: any) => ({
                                            value: String(urgency.id),
                                            label: urgency.name,
                                        }))
                                }
                            />
                        </div>

                        <div className="ticket-select-container">
                            <CustomSelect
                                label="Impacto"
                                name="impact"
                                value={formData.impact ?? ""}
                                onChange={handleChange}
                                options={
                                    loadingSubCategories
                                        ? [{ value: "", label: "Carregando..." }]
                                        : (impacts ?? []).map((impact: any) => ({
                                            value: String(impact.id),
                                            label: impact.name,
                                        }))
                                }
                            />
                        </div>
                    </div>

                    {/* ── Descrição ── */}
                    <div className="ticket-input-container">
                        <div className="kb-editor-placeholder">
                            <label className="kb-editor-label">Descricao</label>
                            <TiptapEditor
                                content={formData.description}
                                onChange={(value) => handleDescriptionChange(value)}
                                placeholder="Descreva a solicitação em detalhes"
                                minHeight="250px"
                                maxHeight="300px"
                                scrollable={true}
                                key={editorKey}
                            />
                        </div>

                    </div>
                    {/* ── Anexos ── */}
                    <div className="ticket-upload-container">
                        <label className="ticket-upload-label">Anexos</label>

                        <label className="ticket-upload-btn">
                            <input
                                type="file"
                                multiple
                                hidden
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    setAttachedFiles(prev => [...prev, ...files]);
                                }}
                            />
                            📎 Selecionar arquivos
                        </label>

                        {attachedFiles.length > 0 && (
                            <div className="ticket-file-list">
                                {attachedFiles.map((file, index) => (
                                    <div key={index} className="ticket-file-chip">
                                        <span>{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== index))}
                                            className="remove-word-button"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* ── Botão ── */}
                    <div className="group-search-button">
                        <Button
                            text={isSubmitting ? "Salvando..." : " Abrir Chamado"}
                            icon={faTicket}
                            background="#0f766e"
                            hoverColor="#0d9488"
                            type="submit"
                            borderRadius="5px"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TicketFormCreate;