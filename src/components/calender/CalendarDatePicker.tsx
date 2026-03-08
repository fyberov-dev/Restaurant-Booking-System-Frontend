import useCalendar from "../../hooks/calendar/useCalendar";
import ChevronRight from "../../assets/icons/chevron_right.svg";
import ChevronLeft from "../../assets/icons/chevron_left.svg";

interface CalendarDatePickerProps {
    selectedDate: Date;
    updateSelectedDate: (date: Date) => void;
}

const CalendarDatePicker = ({ selectedDate, updateSelectedDate }: CalendarDatePickerProps) => {
    console.log("[LOG] [Calendar] [CalendarDatePicker] Rerendered");

    const { nextMonth, prevMonth, data: calendar, activeDate, daysOfTheWeek, now, selectedMonth } = useCalendar();

    const getStyle = (date: Date) => {
        if (selectedDate.toLocaleDateString() === date.toLocaleDateString()) {
            return "bg-blue-600/45 ring ring-blue-600 shadow-xl shadow-blue-600/30";
        }

        if (date.toLocaleDateString() === now.toLocaleDateString()) {
            return "bg-blue-400/45 ring ring-blue-400 shadow-lg shadow-blue-400/30";
        }

        if (date.getMonth() != selectedMonth.getMonth() || date < now) {
            return "opacity-30 hover:bg-gray-600/50 active:bg-blue-600";
        }

        return "hover:bg-gray-600/50 active:bg-blue-500 bg-neutral-800/10 backdrop-blur-xs";
    };

    const selectDate = (date: Date) => {
        if (date.getTime() <= now.getTime() && date.getDate() !== now.getDate()) {
            return;
        }

        updateSelectedDate(date);
    };

    return (
        <div className="p-1 flex flex-col gap-3 border-b border-neutral-800">
            <div className="flex flex-col gap-3 p-3 bg-neutral-800/10 border border-neutral-800 rounded-xl">
                <div className="flex justify-between items-center gap-3">
                    <div className="transition-all cursor-pointer hover:-translate-x-px" onClick={() => prevMonth()}>
                        <img src={ChevronLeft} alt="prev month" />
                    </div>
                    <p className="text-white">{activeDate}</p>
                    <div className="transition-all cursor-pointer hover:translate-x-px" onClick={() => nextMonth()}>
                        <img src={ChevronRight} alt="next month" />
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 select-none">
                    {daysOfTheWeek.map((d, i) => (
                        <div className="px-3 flex items-center justify-center" key={i}>
                            <p className="text-white capitalize">{d}</p>
                        </div>
                    ))}
                    {calendar.map((d, i) => (
                        <div
                            className={`transition-all p-1 border border-gray-300/10 flex items-center justify-center rounded-lg cursor-pointer ${getStyle(d)} active:scale-95 hover:scale-105`}
                            key={i}
                            onClick={() => selectDate(d)}
                        >
                            <p className="text-white">{d.getDate()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarDatePicker;
