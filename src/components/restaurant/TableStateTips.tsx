interface TableStateTipsProps {
    show: boolean;
}

const tips = [
    {
        title: "Perfect match",
        color: "bg-purple-800/30",
        ring: "ring-purple-600",
        shadow: "shadow-purple-600/30",
    },
    {
        title: "Available",
        color: "bg-green-800/30",
        ring: "ring-green-600",
        shadow: "shadow-green-600/30",
    },
    {
        title: "Available / Bad match",
        color: "bg-yellow-800/30",
        ring: "ring-yellow-600",
        shadow: "shadow-yellow-600/30",
    },
    {
        title: "Unavailable",
        color: "bg-red-800/30",
        ring: "ring-red-600",
        shadow: "shadow-red-600/30",
    },
] as const;

const TableStateTips = ({ show }: TableStateTipsProps) => {
    return (
        <div
            className={`select-none absolute transition-all bottom-1 left-1/2 flex items-center z-105 gap-3 -translate-x-1/2 ${show ? "opacity-100 -translate-y-1/2" : "-translate-y-1/4 opacity-0"}`}
        >
            {tips.map((t) => (
                <div
                    className={`${t.color} ring ${t.ring} px-2 py-1 rounded-xl backdrop-blur-xs whitespace-nowrap shadow-lg ${t.shadow}`}
                    key={t.color}
                >
                    <p className="text-white text-sm">{t.title}</p>
                </div>
            ))}
        </div>
    );
};

export default TableStateTips;
