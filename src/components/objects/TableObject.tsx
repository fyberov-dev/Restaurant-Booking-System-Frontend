import type { Table } from "../../types/table/Table";
import ChairObject from "./ChairObject";

interface TableObjectProps {
    table: Table;
    isBusy: boolean;
}

const TableObject = ({ table, isBusy }: TableObjectProps) => {
    return (
        <div
            onClick={() => console.log(table.id)}
            className={`absolute flex flex-col ${table.isVertical ? "rotate-90" : ""}`}
            style={{
                left: `${table.x}px`,
                top: `${table.y}px`,
            }}
        >
            <div className="table flex flex-col items-center justify-center">
                {[...Array(table.guests / 2)].map((_, i) => (
                    <div className="flex items-center justify-center" key={i}>
                        <ChairObject isBusy={isBusy} />
                        <div
                            className={`transition-all table-div ${isBusy ? "bg-red-600" : "bg-zinc-900"}`}
                            style={{
                                width: "42px",
                                height: "32px",
                            }}
                        ></div>
                        <ChairObject isBusy={isBusy} isReverse />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableObject;
