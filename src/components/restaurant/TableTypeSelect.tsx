import { useContext } from "react";
import useTypes from "../../hooks/table/useTypes";
import { BookingContext } from "../../context/BookingContext";

const TableTypeSelect = () => {
    const { selectedType, setSelectedType } = useContext(BookingContext);

    const types = useTypes();

    return (
        <div className="absolute left-3 top-3 flex flex-col gap-3 z-100 bg-neutral-900/30 backdrop-blur-xs ring ring-gray-600 p-3 rounded-xl">
            <p className="text-md text-white">Select table type:</p>
            <button
                className={`transition-all px-3 py-1 ring ring-gray-600 rounded-lg select-none cursor-pointer ${!selectedType ? "bg-blue-600/60" : "bg-gray-800/30"}`}
                onClick={() => setSelectedType(null)}
            >
                <p className="text-white text-md">Any</p>
            </button>
            {Object.entries(types).map(([key, value]) => (
                <button
                    className={`transition-all px-3 py-1 ring ring-gray-600 rounded-lg select-none cursor-pointer ${key === selectedType ? "bg-blue-600/60" : "bg-gray-800/30"}`}
                    key={key}
                    onClick={() => setSelectedType(key)}
                >
                    <p className="text-white text-md">{value}</p>
                </button>
            ))}
        </div>
    );
};

export default TableTypeSelect;
