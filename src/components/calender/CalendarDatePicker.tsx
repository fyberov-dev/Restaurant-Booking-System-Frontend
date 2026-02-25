import { useContext } from "react";
import useCalendar from "../../hooks/calendar/useCalendar";
import { CalendarContext } from "../../context/CalendarContext";

const CalendarDatePicker = () => {
    console.log("[LOG] [Calendar] [CalendarDatePicker] Rerendered");

    const { nextMonth, prevMonth, data: calendar, activeDate, daysOfTheWeek, now, selectedMonth } = useCalendar();

    const { selectedDate, setSelectedDate } = useContext(CalendarContext);

    const getStyle = (date: Date) => {
        if (selectedDate.toLocaleDateString() === date.toLocaleDateString()) {
            return "bg-blue-600";
        } else if (date.toLocaleDateString() === now.toLocaleDateString()) {
            return "bg-blue-400";
        } else if (date.getMonth() != selectedMonth.getMonth()) {
            return "opacity-30 hover:bg-gray-600/50 active:bg-blue-600";
        } else {
            return "hover:bg-gray-600/50 active:bg-blue-600";
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-neutral-900 rounded-xl">
            <div className="flex justify-between items-center gap-3">
                <p className="text-white" onClick={() => prevMonth()}>
                    left
                </p>
                <p className="text-white">{activeDate}</p>
                <p className="text-white" onClick={() => nextMonth()}>
                    right
                </p>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {daysOfTheWeek.map((d, i) => (
                    <div className="p-3 flex items-center justify-center" key={i}>
                        <p className="text-white capitalize">{d}</p>
                    </div>
                ))}
                {calendar.map((d, i) => (
                    <div
                        className={`transition-all p-2 flex items-center justify-center rounded-lg cursor-pointer ${getStyle(d)}`}
                        key={i}
                        onClick={() => setSelectedDate(d)}
                    >
                        <p className="text-white">{d.getDate()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarDatePicker;
