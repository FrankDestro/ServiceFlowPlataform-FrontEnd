import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button/Button.tsx";
import Switch from "../../../components/UI/SwitchDefault/Switch.tsx";
import { type CategoryTicketDTO } from "../models/CategoryTicketDTO.ts";
import { type SLADTO } from "../models/slaDTO";
import { type SolvingAreaDTO } from "../models/solvingAreaDTO";
import { type TypeRequestDTO } from "../models/typeRequestDTO";
import * as CategoryTicketService from "../service/category-service.ts";
import * as SlaService from "../service/sla-service.ts";
import * as solvingAreaService from "../service/solving-area";
import * as TypeRequestService from "../service/type-request";
import "./SearchTicket.css";
import CustomDatePicker from "../../../components/form/CustomDatePicker/CustomDatePicker.tsx";

type Switches = {
    myTickets: boolean;
    myAreaTickets: boolean;
    assignedToMe: boolean;
    slaBreached: boolean;
};

type Props = {
    onSearch: (filters: {
        ticketNumber: string;
        status: string;
        channel: string;
        solvingAreaId: string;
        typeRequestId: string;
        categoryTicketId: string;
        slaId: string;
        initialDate: string,   
        finalDate: string,     
        myTickets: boolean;
        myAreaTickets: boolean;
        assignedToMe: boolean;
        slaBreached: boolean;
    }) => void;
};

function SearchTicket({ onSearch }: Props) {
    const [solvingAreas, setSolvingAreas] = useState<SolvingAreaDTO[]>([]);
    const [typeRequests, setTypeRequests] = useState<TypeRequestDTO[]>([]);
    const [categories, setCategories] = useState<CategoryTicketDTO[]>([]);
    const [slaList, setSlaList] = useState<SLADTO[]>([]);

    const [filters, setFilters] = useState({
        ticketNumber: "",
        status: "",
        channel: "",
        solvingAreaId: "",
        typeRequestId: "",
        categoryTicketId: "",
        slaId: "",
        initialDate: "",  
        finalDate: "",     
        sort: ""
    });

    const [switches, setSwitches] = useState<Switches>({
        myTickets: false,
        myAreaTickets: false,
        assignedToMe: false,
        slaBreached: false,
    });

    useEffect(() => {
        solvingAreaService.getAllSolvingArea().then(r => setSolvingAreas(r.data));
        TypeRequestService.getAllTypeRequest().then(r => setTypeRequests(r.data));
        CategoryTicketService.getAllCategoryTicket().then(r => setCategories(r.data));
        SlaService.getAllSla().then(r => setSlaList(r.data));
    }, []);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        if (name === "ticketNumber") {
            const onlyNumbers = value.replace(/\D/g, "");
            const formatted = onlyNumbers ? `TKT-${onlyNumbers.padStart(6, "0")}` : "";
            setFilters(prev => ({ ...prev, ticketNumber: formatted }));
            return;
        }
        setFilters(prev => ({ ...prev, [name]: value }));
    }

    function handleSwitchChange(name: string, checked: boolean) {
        setSwitches(prev => ({ ...prev, [name]: checked }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch({ ...filters, ...switches });
    }

    function handleClearFilters() {
        setFilters({
            ticketNumber: "",
            status: "",
            channel: "",
            solvingAreaId: "",
            typeRequestId: "",
            categoryTicketId: "",
            slaId: "",
            initialDate: "",   // ← era registrationDate
            finalDate: "",     // ← novo
            sort: ""
        });
        setSwitches({ myTickets: false, myAreaTickets: false, assignedToMe: false, slaBreached: false });
        onSearch({
            ticketNumber: "", status: "", channel: "", solvingAreaId: "",
            typeRequestId: "", categoryTicketId: "", slaId: "",
            initialDate: "", finalDate: "", myTickets: false, myAreaTickets: false, assignedToMe: false, slaBreached: false,
        });
    }
    return (
        <div className="ticket-search-card">
            <form onSubmit={handleSubmit}>
                <div className="ticket-search-container">

                    {/* ── Linha 1 — inputs e selects ── */}
                    <div className="group-search-text">
                        <div className="kedb-input-container">
                            <input
                                type="text"
                                placeholder=" "
                                name="ticketNumber"
                                value={filters.ticketNumber}
                                onChange={handleInputChange}
                                className="floating-input"
                            />
                            <label className="floating-label">Nº do Ticket</label>
                        </div>

                        <div className="kedb-select-container">
                            <select name="status" value={filters.status} onChange={handleInputChange}>
                                <option value="">Todos os status</option>
                                <option value="OPEN">Aberto</option>
                                <option value="IN_PROGRESS">Em andamento</option>
                                <option value="FROZEN">Aguardando</option>
                                <option value="CANCELED">Cancelado</option>
                                <option value="FINISHED">Finalizado</option>
                            </select>
                        </div>

                        <div className="kedb-select-container">
                            <select name="channel" value={filters.channel} onChange={handleInputChange}>
                                <option value="">Todos os canais</option>
                                <option value="PORTAL">Portal</option>
                                <option value="EMAIL">E-mail</option>
                                <option value="PHONE">Telefone</option>
                                <option value="CHAT">Chat</option>
                                <option value="WHATSAPP">WhatsApp</option>
                            </select>
                        </div>

                        <div className="kedb-select-container">
                            <select name="solvingAreaId" value={filters.solvingAreaId} onChange={handleInputChange}>
                                <option value="">Todas as áreas</option>
                                {solvingAreas.map(a => (
                                    <option key={a.id} value={String(a.id)}>{a.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="kedb-select-container">
                            <select name="typeRequestId" value={filters.typeRequestId} onChange={handleInputChange}>
                                <option value="">Todos os tipos</option>
                                {typeRequests.map(t => (
                                    <option key={t.id} value={String(t.id)}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="kedb-select-container">
                            <select name="categoryTicketId" value={filters.categoryTicketId} onChange={handleInputChange}>
                                <option value="">Todas as categorias</option>
                                {categories.map(c => (
                                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="kedb-select-container">
                            <select name="slaId" value={filters.slaId} onChange={handleInputChange}>
                                <option value="">Todos os SLAs</option>
                                {slaList.map(s => (
                                    <option key={s.id} value={String(s.id)}>{s.severity}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ── Linha 2 — datas ← FORA do group-search-text ── */}
                    <div className="group-search-date">
                        <div className="group-search-date-register">
                            <span>Data inicial</span>
                            <CustomDatePicker
                                value={filters.initialDate}
                                onChange={(value) => setFilters(prev => ({ ...prev, initialDate: value }))}
                                
                            />
                        </div>
                        <div className="group-search-date-register">
                            <span>Data final</span>
                            <CustomDatePicker
                                value={filters.finalDate}
                                onChange={(value) => setFilters(prev => ({ ...prev, finalDate: value }))}
                                
                            />
                        </div>
                    </div>

                    {/* ── Linha 3 — switches ── */}
                    <div className="group-search-switches">
                        <div className="switch-item">
                            <Switch
                                name="myTickets"
                                checked={switches.myTickets}
                                onChange={handleSwitchChange}
                            />
                            <span>Meus Tickets</span>
                        </div>
                        <div className="switch-item">
                            <Switch
                                name="myAreaTickets"
                                checked={switches.myAreaTickets}
                                onChange={handleSwitchChange}
                            />
                            <span>Tickets da minha área</span>
                        </div>
                        <div className="switch-item">
                            <Switch
                                name="assignedToMe"
                                checked={switches.assignedToMe}
                                onChange={handleSwitchChange}
                            />
                            <span>Atribuídos a mim</span>
                        </div>

                        <div className="switch-item">
                            <Switch
                                name="slaBreached"
                                checked={switches.slaBreached}
                                onChange={handleSwitchChange}
                            />
                            <label>SLA Vencido</label>
                        </div>
                    </div>

                    {/* ── Botões ── */}
                    <div className="group-search-button">
                        <div className="kedb-filters">
                            <Button
                                text="Filtrar"
                                icon={faFilter}
                                background="#0f766e"
                                hoverColor="#0d9488"
                                type="submit"
                                borderRadius="5px"
                                size="small"
                            />
                            <div onClick={handleClearFilters}>
                                <Button
                                    text="Limpar"
                                    icon={faEraser}
                                    background="#0f766e"
                                    hoverColor="#0d9488"
                                    borderRadius="5px"
                                    size="small"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchTicket;