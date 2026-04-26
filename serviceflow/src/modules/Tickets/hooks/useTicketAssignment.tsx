import { useEffect, useState } from "react";
import type { SolvingAreaDTO } from "../models/solvingAreaDTO";
import type { UserDTO } from "../../Usuarios/models/RequesterDTO";
import * as CategoryTicketService from "../service/category-service";
import * as UserService from "../../../modules/Usuarios/service/user-service"

export function useTicketAssignment(ticketId: number, initialCategoryId: string = "", initialSolvingAreaId: string = "", initialTechnicianId: string = "") {

    const [formData, setFormData] = useState({
        categoryId: initialCategoryId,
        solvingAreaId: initialSolvingAreaId,
        technicianId: initialTechnicianId,
    });

    const [solvingArea, setSolvingArea] = useState<SolvingAreaDTO | null>(null);
    const [analysts, setAnalysts] = useState<UserDTO[]>([]);

    useEffect(() => {
        if (!formData.categoryId) return;
        CategoryTicketService.getSolvingAreaByCategory(formData.categoryId).then((r) => {
            setSolvingArea(r.data);
            setFormData(prev => ({ ...prev, solvingAreaId: String(r.data.id) }));
            UserService.getAllUserBySolvingArea(r.data.id).then(r => setAnalysts(r.data));
        });
    }, [formData.categoryId]);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return {
        formData,
        solvingArea,
        analysts,
        handleChange,
    };
}