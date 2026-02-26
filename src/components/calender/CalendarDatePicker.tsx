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
            return "bg-blue-600/40 text-white";
        }

        if (date.toLocaleDateString() === now.toLocaleDateString()) {
            return "bg-blue-400/40 text-white";
        }

        if (date.getMonth() != selectedMonth.getMonth()) {
            return "opacity-30 hover:bg-gray-600/50 active:bg-blue-600 text-white";
        }

        return "hover:bg-gray-600/50 active:bg-blue-600 text-white";
    };

    return (
        <div className="px-3 flex flex-col gap-3 border-b border-gray-600 py-3">
            <div className="flex flex-col gap-3 p-3 bg-gray-600/10 border border-gray-300 rounded-xl">
                <div className="flex justify-between items-center gap-3">
                    <div className="transition-all cursor-pointer hover:-translate-x-px" onClick={() => prevMonth()}>
                        <img src={ChevronLeft} alt="prev month" />
                    </div>
                    <p className="text-white">{activeDate}</p>
                    <div className="transition-all cursor-pointer hover:-translate-x-px" onClick={() => nextMonth()}>
                        <img src={ChevronRight} alt="next month" />
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {daysOfTheWeek.map((d, i) => (
                        <div className="px-3 flex items-center justify-center" key={i}>
                            <p className="text-white capitalize">{d}</p>
                        </div>
                    ))}
                    {calendar.map((d, i) => (
                        <div
                            className={`transition-all p-1 active:scale-90 border border-gray-300/10 flex items-center justify-center rounded-lg cursor-pointer ${getStyle(d)}`}
                            key={i}
                            onClick={() => updateSelectedDate(d)}
                        >
                            <p>{d.getDate()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarDatePicker;
