import { useContext } from "react";
import useTypes from "../../hooks/table/useTypes";
import { BookingContext } from "../../context/BookingContext";
import useFetchBookings from "../../hooks/booking/useFetchBookings";

const TableTypeSelect = () => {
    const { selectedType, setSelectedType, startTime, endTime, selectedGuests } = useContext(BookingContext);

    const { fetch } = useFetchBookings();

    const types = useTypes();

    const updateType = (type: string | null) => {
        setSelectedType(type);
        fetch(startTime, endTime, selectedGuests, type);
    };

    return (
        <div className="absolute left-3 top-3 flex flex-col gap-3 z-100 bg-neutral-950/20 backdrop-blur-lg ring ring-neutral-800 p-3 rounded-xl shadow-sm shadow-neutral-950">
            <p className="text-md text-white">Select table type:</p>
            <button
                className={`transition-all px-3 py-1 border border-neutral-800 rounded-lg select-none cursor-pointer active:scale-95 hover:scale-101 ${!selectedType ? "bg-blue-600/30 ring ring-blue-600 shadow-lg shadow-blue-600/30" : "bg-neutral-950/10 shadow-xs shadow-neutral-950 hover:bg-neutral-800/10"}`}
                onClick={() => updateType(null)}
            >
                <p className="text-white text-md">Any</p>
            </button>
            {Object.entries(types).map(([key, value]) => (
                <button
                    className={`transition-all px-3 py-1 border border-neutral-800 rounded-lg select-none cursor-pointer active:scale-95 hover:scale-101 ${key === selectedType ? "bg-blue-600/30 ring ring-blue-600 shadow-lg shadow-blue-600/30" : "shadow-xs shadow-neutral-950 bg-neutral-950/10 hover:bg-neutral-800/10"}`}
                    key={key}
                    onClick={() => updateType(key)}
                >
                    <p className="text-white text-md">{value}</p>
                </button>
            ))}
        </div>
    );
};

export default TableTypeSelect;
