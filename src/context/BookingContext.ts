import { createContext } from "react";
import type { FilteredTablesDto } from "../types/table/FilteredTablesDto";
import type { Table } from "../types/table/Table";

export interface BookingContextType {
    bookedTables: FilteredTablesDto;
    updateBookedTables: (bookedTables: FilteredTablesDto) => void;

    isPlanActive: boolean;
    setIsPlanActive: (isActive: boolean) => void;

    startTime: Date | null;
    setStartTime: (d: Date | null) => void;

    endTime: Date | null;
    setEndTime: (d: Date | null) => void;

    selectedGuests: number;
    updateSelectedGuests: (guests: number) => void;

    selectedType: string | null;
    setSelectedType: (type: string | null) => void;

    selectedTable: Table | null;
    setSelectedTable: (table: Table | null) => void;

    clearBookedTables: () => void;
}

export const BookingContext = createContext<BookingContextType>({
    bookedTables: [],
    updateBookedTables: () => undefined,

    isPlanActive: false,
    setIsPlanActive: () => undefined,

    startTime: null,
    setStartTime: () => undefined,

    endTime: null,
    setEndTime: () => undefined,

    selectedGuests: 2,
    updateSelectedGuests: () => undefined,

    selectedType: null,
    setSelectedType: () => undefined,

    selectedTable: null,
    setSelectedTable: () => undefined,

    clearBookedTables: () => undefined,
});
