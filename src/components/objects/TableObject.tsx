import { TableRating } from "../../types/table/FilteredTablesDto";
import { type Table } from "../../types/table/Table";
import ChairObject from "./ChairObject";

interface TableObjectProps {
    table: Table;
    state: TableRating | null;
    onClick: (tableId: number) => void;
}

const TableObject = ({ table, state, onClick }: TableObjectProps) => {
    const getStyle = () => {
        if (state === TableRating.BEST) {
            return "bg-purple-800/60 border-purple-600";
        }

        if (state === TableRating.GOOD) {
            return "bg-green-800/60 border-green-600";
        }

        if (state === TableRating.BAD) {
            return "bg-yellow-800/60 border-yellow-600";
        }

        if (state === TableRating.WORST) {
            return "bg-orange-800/60 border-orange-600";
        }

        if (state === TableRating.UNAVAILABLE) {
            return "bg-red-800/60 border-red-600";
        }

        return "bg-neutral-800/60 border-neutral-600";
    };

    return (
        <div
            onClick={() => onClick(table.id)}
            className={`absolute flex flex-col cursor-pointer ${table.isVertical ? "rotate-90" : ""}`}
            style={{
                left: `${table.x}px`,
                top: `${table.y}px`,
            }}
        >
            <div className="table flex flex-col items-center justify-center">
                {[...Array(table.guests / 2)].map((_, i) => (
                    <div className="flex items-center justify-center" key={i}>
                        <ChairObject state={state} />
                        <div
                            className={`transition-all table-div ${getStyle()}`}
                            style={{
                                width: "42px",
                                height: "32px",
                            }}
                        ></div>
                        <ChairObject state={state} isReverse />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableObject;
