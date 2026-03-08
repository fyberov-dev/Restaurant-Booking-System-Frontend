import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

const PeopleCountSelector = () => {
    const { selectedGuests, updateSelectedGuests } = useContext(BookingContext);

    const increase = () => {
        updateSelectedGuests(selectedGuests + 1);
    };

    const decrease = () => {
        updateSelectedGuests(selectedGuests - 1);
    };

    return (
        <div className="absolute left-3 bottom-3 px-3 py-2 gap-3 flex flex-col bg-neutral-950/20 rounded-lg ring ring-neutral-800 z-100 backdrop-blur-lg shadow-sm shadow-neutral-950">
            <p className="text-white">People count:</p>
            <div className="flex w-full justify-between gap-1">
                <button
                    className="w-full aspect-square text-white p-1 bg-neutral-950/10 shadow-xs shadow-neutral-950 border border-neutral-800 hover:bg-neutral-800/10 rounded-lg cursor-pointer active:scale-95 hover:scale-101"
                    onClick={decrease}
                >
                    -
                </button>
                <button className="w-full aspect-square text-white p-1 rounded-lg">{selectedGuests}</button>
                <button
                    className="w-full aspect-square text-white p-1 bg-neutral-950/10 shadow-xs shadow-neutral-950 border border-neutral-800 hover:bg-neutral-800/10 rounded-lg cursor-pointer active:scale-95 hover:scale-101"
                    onClick={increase}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default PeopleCountSelector;
