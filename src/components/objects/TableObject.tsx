import type { TableRating } from "../../types/table/FilteredTablesDto";
import { type Table } from "../../types/table/Table";
import ChairObject from "./ChairObject";

interface TableObjectProps {
    table: Table;
    state: TableRating | null;
    onClick: (tableId: number) => void;
}

const TableObject = ({ table, state, onClick }: TableObjectProps) => {
    const getStyle = () => {
        if (state === "PERFECT") {
            return "bg-purple-800/60 border-purple-600";
        }

        if (state === "AVAILABLE") {
            return "bg-green-800/60 border-green-600";
        }

        if (state === "BAD") {
            return "bg-orange-800/60 border-orange-600";
        }

        if (state === "UNAVAILABLE") {
            return "bg-red-800/60 border-red-600";
        }

        return "bg-neutral-800/60 border-neutral-600";
    };

    return (
        <div
            className={`restaurant-table absolute flex cursor-pointer ${table.isVertical && "vertical-table"}`}
            style={{
                left: `${table.x}px`,
                top: `${table.y}px`,
            }}
            onClick={() => onClick(table.id)}
        >
            {[...Array(table.guests / 2)].map((_, i) => (
                <div className="relative flex items-center justify-center" key={i}>
                    <ChairObject state={state} />
                    <div className={`table-div transition-all table-div ${getStyle()}`}></div>
                    <ChairObject state={state} isReverse />
                </div>
            ))}
        </div>
    );
};

export default TableObject;
