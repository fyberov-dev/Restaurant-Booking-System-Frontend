interface TableStateTipsProps {
    show: boolean;
}

const tips = [
    {
        title: "Perfect match",
        color: "purple",
    },
    {
        title: "Good match",
        color: "green",
    },
    {
        title: "Bad match",
        color: "orange",
    },
    {
        title: "Unavailable",
        color: "red",
    },
] as const;

const TableStateTips = ({ show }: TableStateTipsProps) => {
    return (
        <div
            className={`select-none absolute transition-all bottom-1 left-1/2 flex items-center z-105 gap-3 -translate-x-1/2 ${show ? "opacity-100 -translate-y-1/2" : "-translate-y-1/4 opacity-0"}`}
        >
            {tips.map((t, i) => (
                <div className={`bg-${t.color}-800/60 ring ring-${t.color}-600 px-2 py-1 rounded-xl`} key={t.color}>
                    <p className="text-white text-sm">{t.title}</p>
                </div>
            ))}
        </div>
    );
};

export default TableStateTips;
