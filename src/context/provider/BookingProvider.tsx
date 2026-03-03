import type React from "react";
import { BookingContext, type BookingContextType } from "../BookingContext";
import { useCallback, useEffect, useState } from "react";
import type { FilteredTablesDto } from "../../types/table/FilteredTablesDto";
import useBookings from "../../hooks/booking/useBookings";
import type { Table } from "../../types/table/Table";

interface BookingProviderType {
    children: React.ReactNode;
}

const BookingProvider = ({ children }: BookingProviderType) => {
    const [bookedTables, setBookedTables] = useState<FilteredTablesDto>({});

    const [isPlanActive, setIsPlanActive] = useState<boolean>(false);

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [selectedGuests, setSelectedGuests] = useState<number>(2);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);

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

    const fetchBookings = useCallback(() => {
        if (!startTime || !endTime) return;

        const startTimeStr = startTime.toISOString();
        const endTimeStr = endTime.toISOString();

        getBookingsMutate(
            {
                startTime: startTimeStr,
                endTime: endTimeStr,
                guests: selectedGuests,
                type: selectedType,
            },
            {
                onSuccess: (b) => {
                    setBookedTables(b);
                    setIsPlanActive(true);
                },
            },
        );
    }, [startTime, endTime, selectedGuests, selectedType, getBookingsMutate]);

    useEffect(() => {
        fetchBookings();
    }, [startTime, endTime, fetchBookings, selectedGuests, selectedType]);

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
                    selectedType,
                    setSelectedType,
                    selectedTable,
                    setSelectedTable,
                    fetchBookings,
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
