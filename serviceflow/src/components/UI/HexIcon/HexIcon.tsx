import { type LucideIcon } from "lucide-react";

type Props = {
    icon: LucideIcon;
    color: string;
    bg: string;
}

export function HexIcon({ icon: Icon, color, bg }: Props) {
    return (
        <svg width="36" height="40" viewBox="0 0 48 52">
            <polygon
                points="24,2 46,14 46,38 24,50 2,38 2,14"
                fill={bg}
                stroke={color}
                strokeWidth="1.5"
            />
            <foreignObject x="10" y="12" width="28" height="28">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28 }}>
                    <Icon size={25} color={color} />
                </div>
            </foreignObject>
        </svg>
    );
}