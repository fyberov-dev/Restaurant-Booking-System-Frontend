import type { Table } from "../../types/table/Table";
import ChairObject from "./ChairObject";

interface TableObjectProps {
    table: Table;
}

const TableObject = ({ table }: TableObjectProps) => {
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
                        <ChairObject />
                        <div
                            className="table-div bg-zinc-900"
                            style={{
                                width: "42px",
                                height: "32px",
                            }}
                        ></div>
                        <ChairObject isReverse />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableObject;
