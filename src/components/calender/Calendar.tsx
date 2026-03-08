import { useContext, useState } from "react";
import CalendarDatePicker from "./CalendarDatePicker";
import CalendarTimePicker from "./CalendarTimePicker";
import { BookingContext } from "../../context/BookingContext";

const Calendar = () => {
    console.log("[LOG] [Calendar] [Calendar] Rerendered");
    const { bookedTables, clearBookedTables, setStartTime, setEndTime, setSelectedTable, updateBookedTables } =
        useContext(BookingContext);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const updateSelectedDate = (date: Date) => {
        setSelectedDate(date);
        setStartTime(null);
        setEndTime(null);

        if (bookedTables) {
            clearBookedTables();
        }
    };

    const reset = () => {
        setSelectedTable(null);
        setStartTime(null);
        setEndTime(null);
        updateBookedTables({});
    };

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden">
            <header className="w-full px-3 py-4 flex items-center justify-start border-b border-neutral-800">
                <h3 className="text-white text-xl">Book the table</h3>
            </header>
            <CalendarDatePicker selectedDate={selectedDate} updateSelectedDate={updateSelectedDate} />
            <CalendarTimePicker selectedDate={selectedDate} reset={reset} />
        </div>
    );
};

export default Calendar;
