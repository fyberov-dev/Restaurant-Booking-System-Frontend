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
        <div className="absolute left-3 bottom-3 px-3 py-2 gap-3 flex flex-col bg-neutral-900/30 rounded-lg ring ring-gray-600 z-100">
            <p className="text-white">People count:</p>
            <div className="flex w-full justify-between gap-1">
                <button
                    className="w-full aspect-square text-white p-1 border border-gray-600 hover:bg-gray-600 rounded-lg cursor-pointer"
                    onClick={decrease}
                >
                    -
                </button>
                <button className="w-full aspect-square text-white p-1 rounded-lg">{selectedGuests}</button>
                <button
                    className="w-full aspect-square text-white p-1 border border-gray-600 hover:bg-gray-600 rounded-lg cursor-pointer"
                    onClick={increase}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default PeopleCountSelector;
