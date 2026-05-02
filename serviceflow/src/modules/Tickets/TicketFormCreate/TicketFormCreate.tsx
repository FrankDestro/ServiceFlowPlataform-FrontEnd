import { faDatabase, faTicket } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/UI/Button/Button";
import { useTicketForm } from "../hooks/useTicketForm";
import "./TicketFormCreate.css";

function TicketFormCreate() {
    const {
        typeRequests,
        categories,
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
    } = useTicketForm();

    return (
        <div className="ticket-form-card">
            <form onSubmit={handleSubmit}>
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
                            <select name="categoryTicket" value={formData.categoryTicket} onChange={handleChange}>
                                <option value="">Categoria do Chamado</option>
                                {categories.map(c => (
                                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                                ))}

                            </select>
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
                            <label className="floating-label">Area Solucionadora</label>
                        </div>
                        <div className="ticket-input-container">
                            <input
                                type="number"
                                placeholder=" "
                                name="parentTicketId"
                                value={formData.parentTicketId}
                                onChange={handleChange}
                                className="floating-input"
                            />
                            <label className="floating-label">Ticket Referência</label>
                        </div>
                    </div>

                    {/* ── Linha 2 — Tipo + Urgência + Impacto ── */}
                    <div className="ticket-form-row">
                        <div className="ticket-select-container">
                            <select name="typeRequest" value={formData.typeRequest} onChange={handleChange}>
                                <option value="">Tipo de Solicitação</option>
                                {typeRequests.map(t => (
                                    <option key={t.id} value={String(t.id)}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="ticket-select-container">
                            <select name="urgency" value={formData.urgency} onChange={handleChange}>
                                <option value="">Urgência</option>
                                {urgencies.map(u => (
                                    <option key={u.id} value={String(u.id)}>{u.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="ticket-select-container">
                            <select name="impact" value={formData.impact} onChange={handleChange}>
                                <option value="">Impacto</option>
                                {impacts.map(i => (
                                    <option key={i.id} value={String(i.id)}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ── Descrição ── */}
                    <div className="ticket-input-container">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={(e) => handleDescriptionChange(e.target.value)}
                            placeholder="Descreva a solicitação em detalhes"
                            className="ticket-textarea"
                            rows={8}
                        />
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