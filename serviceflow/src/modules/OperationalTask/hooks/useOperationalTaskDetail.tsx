// hooks/useOperationalTaskDetail.ts
import { useQuery } from "@tanstack/react-query";

const mockTask = {
    taskNumber: "OT-42",
    title: "Backup semanal do banco de dados PostgreSQL",
    status: "IN_PROGRESS",
    priority: "HIGH",
    type: "BACKUP",
    category: "Banco de Dados",
    description: "Realizar backup completo de todos os servidores de produção",
    subcategory: "Backup",
    assignedTo: "Carlos Pereira",
    createBy: "Juliana Costa",
    createdAt: "10/06/2026 09:00",
    updatedAt: "23/06/2026 02:05",
    scheduledStart: "23/06/2026 02:00",
    scheduledEnd: "23/06/2026 06:00",
    actualStart: "23/06/2026 02:05",
    actualEnd: null,
    estimatedHours: 3,
    completionPercentage: 50,
    cancellationReason: null,
    completionNotes: null,
    recurrence: "toda segunda-feira às 02:00 · janela de 4h",
    relatedItems: {
        tickets: [{ id: 1, number: "TK-201", title: "Ticket 201" }],
        changes: [{ id: 1, number: "CH-10", title: "Change 10" }],
        problems: [{ id: 1, number: "PRB-5", title: "Problem 5" }],
    },
};

export default function useOperationalTaskDetail(id: number) {
    return useQuery({
        queryKey: ["operational-task-detail", id],
        queryFn: () => Promise.resolve(mockTask),
    });
}