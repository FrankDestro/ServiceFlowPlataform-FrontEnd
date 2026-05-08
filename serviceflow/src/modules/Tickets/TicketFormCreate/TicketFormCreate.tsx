import { faTicket } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/UI/Button/Button";
import { useTicketForm } from "../hooks/useTicketForm";
import "./TicketFormCreate.css";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect";

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
        loadingSubCategories
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

                    {/* DESENVOLVENDO */}
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