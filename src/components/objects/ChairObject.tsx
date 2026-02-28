import { TableRating } from "../../types/table/FilteredTablesDto";

interface ChairObjectProps {
    isReverse?: boolean;
    state: TableRating | null;
}

const ChairObject = ({ isReverse, state }: ChairObjectProps) => {
    const getStyle = () => {
        if (state === TableRating.PERFECT) {
            return "bg-purple-600/30 border border-purple-600/30";
        }

        if (state === TableRating.GOOD) {
            return "bg-green-600/30 border border-green-600/30";
        }

        if (state === TableRating.BAD) {
            return "bg-orange-600/30 border border-orange-600/30";
        }

        if (state === TableRating.UNAVAILABLE) {
            return "bg-red-600/30 border border-red-600/30";
        }

        return "bg-neutral-600";
    };

    return (
        <div
            className={`chair ${getStyle()} -z-1 ${isReverse ? "translate-x-px" : "-translate-x-px"}`}
            style={{
                width: "8px",
                height: "16px",
                borderRadius: isReverse ? "0px 3px 3px 0px" : "3px 0px 0px 3px",
            }}
        ></div>
    );
};

export default ChairObject;
