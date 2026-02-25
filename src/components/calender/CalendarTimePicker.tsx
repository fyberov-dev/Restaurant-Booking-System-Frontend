import { useContext, useEffect, useState } from "react";
import useAvailableHours from "../../hooks/calendar/useAvailableHours";
import { CalendarContext } from "../../context/CalendarContext";
import { BookingContext } from "../../context/BookingContext";

const maxBookTime = 3;

const CalendarTimePicker = () => {
    const { getBookings } = useContext(BookingContext);
    const { selectedDate } = useContext(CalendarContext);

    const availableHours = useAvailableHours(selectedDate);

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    const getTimings = (date: Date) => {
        return `${formatTiming(date.getHours())}:${formatTiming(date.getMinutes())}`;
    };

    const formatTiming = (num: number) => {
        return num <= 9 ? `0${num}` : String(num);
    };

    if (startTime && endTime) {
        if ((endTime.getTime() - startTime!.getTime()) / 1000 / 60 / 60 > maxBookTime) {
            setStartTime(endTime);
            setEndTime(null);
        }
    }

    const select = async (d: Date) => {
        if (startTime && endTime) {
            const startTimeMs = startTime.getTime();
            const endTimeMs = endTime.getTime();
            const dateMs = d.getTime();

            if (Math.abs(startTimeMs - dateMs) < Math.abs(endTimeMs - dateMs)) {
                setStartTime(d);
            } else {
                setEndTime(d);
            }
        } else if (startTime === null || d < startTime) {
            setStartTime(d);
        } else if (endTime === null || d > startTime) {
            setEndTime(d);
        }

        if (startTime) {
            getBookings(startTime, d);
        }
    };

    const getStyle = (d: Date) => {
        if (d.toLocaleTimeString() === startTime?.toLocaleTimeString()) {
            return `bg-green-500/60`;
        } else if (d.toLocaleTimeString() == endTime?.toLocaleTimeString()) {
            return `bg-yellow-500/60`;
        } else if (startTime && startTime < d && endTime && endTime > d) {
            return "bg-blue-500/20";
        } else if (startTime && d > startTime && (d.getTime() - startTime.getTime()) / 1000 / 60 / 60 <= maxBookTime) {
            if (endTime) {
                return "bg-gray-500/10";
            } else {
                return "bg-gray-500/20";
            }
        }
    };

    return (
        <div className="relative w-full h-full grid grid-cols-2 ps-1 pe-3 gap-3 overflow-auto custom-scrollbar">
            {availableHours?.map((d, i) => (
                <button
                    className={`transition-all text-white hover:bg-gray-600/50 active:bg-blue-600 p-3 flex items-center justify-center border border-gray-300 rounded-xl cursor-pointer ${getStyle(d)}`}
                    key={i}
                    onClick={() => select(d)}
                >
                    {getTimings(d)}
                </button>
            ))}
        </div>
    );
};

export default CalendarTimePicker;
