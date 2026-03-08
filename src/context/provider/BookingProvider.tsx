import type React from "react";
import { BookingContext, type BookingContextType } from "../BookingContext";
import { useState } from "react";
import type { FilteredTablesDto } from "../../types/table/FilteredTablesDto";
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
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const updateSelectedGuests = (guests: number) => {
        if (guests > 0) {
            setSelectedGuests(guests);
        }
    };

    const clearBookedTables = () => {
        setBookedTables({});
    };

    const updateBookedTables = (tables: FilteredTablesDto) => {
        setBookedTables(tables);
        setIsPlanActive(true);
    };

    return (
        <BookingContext.Provider
            value={
                {
                    bookedTables,
                    updateBookedTables,
                    selectedDate,
                    setSelectedDate,
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
