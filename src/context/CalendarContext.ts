import { createContext } from "react";

export interface CalendarContextType {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export const CalendarContext = createContext<CalendarContextType>({
    selectedDate: new Date(),
    setSelectedDate: () => undefined,
});
