import type { TableRating } from "../../types/table/FilteredTablesDto";

interface ChairObjectProps {
    isReverse?: boolean;
    state: TableRating | null;
    isSelected: boolean;
}

const ChairObject = ({ isReverse, state, isSelected }: ChairObjectProps) => {
    const getStyle = () => {
        if (isSelected) {
            return "bg-blue-600/30 border border-blue-600/30";
        }

        if (state === "PERFECT") {
            return "bg-purple-600/30 border border-purple-600/30";
        }

        if (state === "AVAILABLE") {
            return "bg-green-600/30 border border-green-600/30";
        }

        if (state === "BAD") {
            return "bg-yellow-600/30 border border-yellow-600/30";
        }

        if (state === "UNAVAILABLE") {
            return "bg-red-600/30 border border-red-600/30";
        }

        return "bg-neutral-600";
    };

    return <div className={`chair ${getStyle()} -z-1 ${isReverse && "reverse"}`}></div>;
};

export default ChairObject;
