import type React from "react";
import { BookingContext, type BookingContextType } from "../BookingContext";
import { useEffect, useState } from "react";
import type { FilteredTablesDto } from "../../types/table/FilteredTablesDto";
import useBookings from "../../hooks/booking/useBookings";

interface BookingProviderType {
    children: React.ReactNode;
}

const BookingProvider = ({ children }: BookingProviderType) => {
    const [bookedTables, setBookedTables] = useState<FilteredTablesDto>({});

    const [isPlanActive, setIsPlanActive] = useState<boolean>(false);

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [selectedGuests, setSelectedGuests] = useState<number>(2);

    const updateSelectedGuests = (guests: number) => {
        if (guests > 0) {
            setSelectedGuests(guests);
        }
    };

    const { mutate: getBookingsMutate } = useBookings();

    const clearBookedTables = () => {
        setBookedTables({});
    };

    const updateBookedTables = (tables: FilteredTablesDto) => {
        setBookedTables(tables);
        setIsPlanActive(true);
    };

    useEffect(() => {
        if (startTime && endTime) {
            const startTimeStr = startTime.toISOString();
            const endTimeStr = endTime.toISOString();

            getBookingsMutate(
                {
                    startTime: startTimeStr,
                    endTime: endTimeStr,
                    guests: selectedGuests,
                },
                {
                    onSuccess: (b) => {
                        setBookedTables(b);
                        setIsPlanActive(true);
                    },
                },
            );
        }
    }, [startTime, endTime, selectedGuests, getBookingsMutate, setBookedTables, setIsPlanActive]);

    return (
        <BookingContext.Provider
            value={
                {
                    bookedTables,
                    updateBookedTables,
                    isPlanActive,
                    setIsPlanActive,
                    startTime,
                    setStartTime,
                    endTime,
                    setEndTime,
                    selectedGuests,
                    updateSelectedGuests,
                    clearBookedTables,
                } satisfies BookingContextType
            }
        >
            {children}
        </BookingContext.Provider>
    );
};

export default BookingProvider;
