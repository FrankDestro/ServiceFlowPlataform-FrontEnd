import ReactECharts from "echarts-for-react";
import { type TicketHistoriesDTO } from "../models/TicketHistoriesDTO";

type Props = {
    andamentos: TicketHistoriesDTO[];
};

const statusColors: Record<string, string> = {
    OPEN: "#3b82f6",
    IN_PROGRESS: "#f59e0b",
    FROZEN: "#8b5cf6",
    FINISHED: "#10b981",
    CANCELED: "#ef4444",
};

function colorByNoteType(noteType: string): string {
    const map: Record<string, string> = {
        TICKET_OPENED: "#3b82f6",
        REASSIGNMENT: "#8b5cf6",
        PRIORITY_CHANGE: "#f59e0b",
        SLA_BREACH: "#ef4444",
        SYSTEM_GENERATED: "#94a3b8",
    };
    return map[noteType] ?? "#94a3b8";
}

function TicketTimeline({ andamentos }: Props) {

    const LIFECYCLE_EVENTS = [
        "TICKET_OPENED",
        "STATUS_CHANGE",
        "REASSIGNMENT",
        "PRIORITY_CHANGE",
        "SLA_BREACH",
        "SYSTEM_GENERATED",
    ];

    const statusChanges = andamentos.filter(a =>
        LIFECYCLE_EVENTS.includes(a.noteType)
    );

    const data = statusChanges.map((a) => {
        const label = (() => {
            if (a.noteType === "TICKET_OPENED") return "OPEN";
            if (a.noteType === "STATUS_CHANGE") return a.newValue ?? "—";
            if (a.noteType === "REASSIGNMENT") return "REDIRECIONADO";
            if (a.noteType === "PRIORITY_CHANGE") return `PRIORIDADE: ${a.newValue ?? ""}`;
            if (a.noteType === "SLA_BREACH") return "SLA VIOLADO";
            if (a.noteType === "SYSTEM_GENERATED") return a.description ?? "SISTEMA";
            return a.noteType;
        })();

        return {
            value: new Date(a.registrationDate).getTime(),
            name: label,
            noteType: a.noteType,
            color: statusColors[label] ?? colorByNoteType(a.noteType),
        };
    });

    const option = {
        tooltip: {
            trigger: "axis",
            formatter: (params: any) => {
                const p = params[0];
                const date = new Date(p.data[0]).toLocaleString("pt-BR", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                });
                return `<b>${p.data[1]}</b><br/>${date}`;
            },
        },
        xAxis: {
            type: "time",
            axisLabel: {
                fontSize: 10,
                color: "#94a3b8",
                formatter: (value: number) =>
                    new Date(value).toLocaleDateString("pt-BR", {
                        day: "2-digit", month: "2-digit",
                    }),
            },
            axisLine: { lineStyle: { color: "#e2e8f0" } },
            splitLine: { show: false },
        },
        yAxis: {
            type: "category",
            data: [...new Set(data.map(d => d.name))], // ← usa data calculado
            axisLabel: {
                fontSize: 10,
                color: "#64748b",
            },
            axisLine: { lineStyle: { color: "#e2e8f0" } },
            splitLine: {
                lineStyle: { color: "#f1f5f9", type: "dashed" },
            },
        },
        series: [
            {
                type: "line",
                data: data.map(d => [d.value, d.name]),
                smooth: false,
                symbol: "circle",
                symbolSize: 10,
                lineStyle: { color: "#0f766e", width: 2 },
                itemStyle: {
                    color: (params: any) => {
                        const item = data.find(d => d.name === params.data[1]);
                        return item?.color ?? "#94a3b8";
                    },
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    position: "top",
                    fontSize: 10,
                    color: "#64748b",
                    formatter: (params: any) =>
                        new Date(params.data[0]).toLocaleString("pt-BR", {
                            day: "2-digit", month: "2-digit",
                            hour: "2-digit", minute: "2-digit",
                        }),
                },
            },
        ],
        grid: {
            left: "12%",
            right: "5%",
            top: "15%",
            bottom: "15%",
        },
    };

    if (statusChanges.length === 0) {
        return (
            <div style={{ padding: "16px", color: "#94a3b8", fontSize: 12 }}>
                Nenhuma mudança de status registrada.
            </div>
        );
    }

    return (
        <ReactECharts
            option={option}
            style={{ height: "220px", width: "100%" }}
            opts={{ renderer: "svg" }}
        />
    );
}

export default TicketTimeline;