import { useContext, useState } from "react";
import CalendarDatePicker from "./CalendarDatePicker";
import CalendarTimePicker from "./CalendarTimePicker";
import { BookingContext } from "../../context/BookingContext";

const Calendar = () => {
    console.log("[LOG] [Calendar] [Calendar] Rerendered");
    const { bookedTables, clearBookedTables, startTime, endTime, setStartTime, setEndTime } =
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
        setStartTime(null);
        setEndTime(null);
    };

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden">
            <div className="w-full px-3 py-2 flex items-center justify-start border-b border-gray-600">
                <p className="text-white text-xl">Book the table</p>
            </div>
            <CalendarDatePicker selectedDate={selectedDate} updateSelectedDate={updateSelectedDate} />
            <CalendarTimePicker
                startTime={startTime}
                endTime={endTime}
                selectedDate={selectedDate}
                updateStartTime={setStartTime}
                updateEndTime={setEndTime}
                reset={reset}
            />
        </div>
    );
};

export default Calendar;
