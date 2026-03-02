import type { TableRating } from "../../types/table/FilteredTablesDto";

interface ChairObjectProps {
    isReverse?: boolean;
    state: TableRating | null;
}

const ChairObject = ({ isReverse, state }: ChairObjectProps) => {
    const getStyle = () => {
        if (state === "PERFECT") {
            return "bg-purple-600/30 border border-purple-600/30";
        }

        if (state === "AVAILABLE") {
            return "bg-green-600/30 border border-green-600/30";
        }

        if (state === "BAD") {
            return "bg-orange-600/30 border border-orange-600/30";
        }

        if (state === "UNAVAILABLE") {
            return "bg-red-600/30 border border-red-600/30";
        }

        return "bg-neutral-600";
    };

    return <div className={`chair ${getStyle()} -z-1 ${isReverse && "reverse"}`}></div>;
};

export default ChairObject;
