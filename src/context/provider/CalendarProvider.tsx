import { useState } from "react";
import { CalendarContext, type CalendarContextType } from "../CalendarContext";

interface CalendarProviderType {
    children: React.ReactNode;
}

const CalendarProvider = ({ children }: CalendarProviderType) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <CalendarContext.Provider
            value={
                {
                    selectedDate,
                    setSelectedDate,
                } satisfies CalendarContextType
            }
        >
            {children}
        </CalendarContext.Provider>
    );
};

export default CalendarProvider;
