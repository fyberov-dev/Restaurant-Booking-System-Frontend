import { useContext } from "react";
import useBookings from "./useBookings";
import { BookingContext } from "../../context/BookingContext";

function useFetchBookings() {
    const { selectedGuests, selectedType, updateBookedTables, setIsPlanActive } = useContext(BookingContext);

    const { mutate } = useBookings();

    const fetchBookings = (startTime: Date | null, endTime: Date | null, guests?: number, type?: string | null) => {
        if (!startTime || !endTime) return;

        guests = guests ?? selectedGuests;
        type = type === null ? null : (type ?? selectedType);

        const startTimeStr = startTime.toISOString();
        const endTimeStr = endTime.toISOString();

        console.log("mutate");

        mutate(
            {
                startTime: startTimeStr,
                endTime: endTimeStr,
                guests: guests,
                type: type,
            },
            {
                onSuccess: (b) => {
                    updateBookedTables(b);
                    setIsPlanActive(true);
                },
            },
        );
    };

    return { fetch: fetchBookings };
}

export default useFetchBookings;
