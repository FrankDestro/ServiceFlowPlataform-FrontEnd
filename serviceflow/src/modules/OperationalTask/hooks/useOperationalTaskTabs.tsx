// hooks/useOperationalTaskTabs.ts
import { useQuery } from "@tanstack/react-query";

const mockChecklist = [
    { id: 1, title: "Verificar conexão com o banco de dados", completed: true },
    { id: 2, title: "Executar pg_dump e gerar arquivo .sql.gz", completed: true },
    { id: 3, title: "Fazer upload para o bucket S3", completed: false },
    { id: 4, title: "Verificar integridade do arquivo após upload", completed: false },
];

const mockHistory = [
    { id: 1, description: "Tarefa iniciada por Carlos Pereira", createdAt: "23/06/2026 02:05" },
    { id: 2, description: "Status alterado de OPEN para IN_PROGRESS", createdAt: "23/06/2026 02:05" },
    { id: 3, description: "Tarefa OT-42 criada por Juliana Costa", createdAt: "10/06/2026 09:00" },
];

const mockAttachments = [
    { id: 1, fileName: "backup_log_230626.txt", fileSize: "14 KB", createdAt: "23/06/2026 03:10" },
    { id: 2, fileName: "dump_prod_230626.sql.gz", fileSize: "2.4 MB", createdAt: "23/06/2026 03:22" },
];

export function useOperationalTaskChecklist(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["operational-task-checklist", id],
        queryFn: () => Promise.resolve(mockChecklist),
        enabled,
    });
}

export function useOperationalTaskHistory(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["operational-task-history", id],
        queryFn: () => Promise.resolve(mockHistory),
        enabled,
    });
}

export function useOperationalTaskAttachments(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["operational-task-attachments", id],
        queryFn: () => Promise.resolve(mockAttachments),
        enabled,
    });
}