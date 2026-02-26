import { useContext, useEffect } from "react";
import useAvailableHours from "../../hooks/calendar/useAvailableHours";
import { BookingContext } from "../../context/BookingContext";
import useBookings from "../../hooks/booking/useBookings";
import ResetIcon from "../../assets/icons/reset.svg";

// TODO : SHOULD BE REQUESTED FROM THE SERVER. BUT CURRENTLY SERVER DOES NOT PROVIDE THAT
const maxBookTime = 3;

interface CalendarTimePickerProps {
    startTime: Date | null;
    endTime: Date | null;
    selectedDate: Date;
    updateStartTime: (date: Date | null) => void;
    updateEndTime: (date: Date | null) => void;
    reset: () => void;
}

const CalendarTimePicker = ({
    startTime,
    endTime,
    selectedDate,
    updateStartTime,
    updateEndTime,
    reset,
}: CalendarTimePickerProps) => {
    const { setBookings, clearBookings } = useContext(BookingContext);

    const availableHours = useAvailableHours(selectedDate);

    const getTimings = (date: Date) => {
        return `${formatTiming(date.getHours())}:${formatTiming(date.getMinutes())}`;
    };

    const formatTiming = (num: number) => {
        return num <= 9 ? `0${num}` : String(num);
    };

    const { mutate: getBookingsMutate } = useBookings();

    useEffect(() => {
        if (startTime && endTime) {
            const startTimeStr = startTime.toISOString();
            const endTimeStr = endTime.toISOString();

            getBookingsMutate(
                {
                    startTime: startTimeStr,
                    endTime: endTimeStr,
                },
                {
                    onSuccess: (b) => {
                        setBookings(b);
                    },
                },
            );
        } else {
            clearBookings();
        }
    }, [startTime, endTime, getBookingsMutate, setBookings, clearBookings]);

    const select = (d: Date) => {
        if (startTime?.getTime() === d.getTime() || endTime?.getTime() === d.getTime()) {
            return;
        }

        if (startTime === null) {
            updateStartTime(d);
            return;
        }

        if (endTime === null && d > startTime && isInsideMaxBookTime(startTime, d)) {
            updateEndTime(d);
            return;
        }

        if (d < startTime || !isInsideMaxBookTime(startTime, d)) {
            if (endTime && (!isInsideMaxBookTime(d, endTime) || d > endTime)) {
                updateEndTime(null);
            }
            updateStartTime(d);
            return;
        }

        if (endTime && d > endTime && isInsideMaxBookTime(startTime, d)) {
            updateEndTime(d);
            return;
        }

        if (startTime && endTime && isInsideMaxBookTime(startTime, d)) {
            if (isStartTimingCloser(d)) {
                updateStartTime(d);
            } else {
                updateEndTime(d);
            }
        }
    };

    const isInsideMaxBookTime = (startTime: Date, endTime: Date) => {
        return (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 <= maxBookTime;
    };

    const getStyle = (d: Date) => {
        if (d.getTime() === startTime?.getTime()) {
            return "bg-blue-600/60";
        }

        if (d.getTime() === endTime?.getTime()) {
            return "bg-blue-700/60";
        }

        if (startTime && startTime < d && endTime && endTime > d) {
            if (isStartTimingCloser(d)) {
                return "bg-blue-600/20 hover:bg-blue-600/20 active:bg-blue-600/40";
            } else {
                return "bg-blue-700/10 hover:bg-blue-700/20 active:bg-blue-700/40";
            }
        }

        if (startTime && d > startTime && isInsideMaxBookTime(startTime, d)) {
            return "bg-gray-600/30 hover:bg-gray-600/60 active:bg-gray-600/100";
        }

        if (
            endTime &&
            startTime &&
            d < startTime &&
            d.getTime() != startTime.getTime() &&
            isInsideMaxBookTime(d, endTime)
        ) {
            return "bg-gray-600/30 hover:bg-gray-600/60 active:bg-gray-600/100 opacity-80";
        }

        if (startTime && (d < startTime || !isInsideMaxBookTime(startTime, d))) {
            return "opacity-30 hover:opacity-60 active:opacity-100";
        }

        return "bg-gray-600/10 hover:bg-gray-600/50";
    };

    const isStartTimingCloser = (date: Date) => {
        const startTimeMs = startTime!.getTime();
        const endTimeMs = endTime!.getTime();
        const dateMs = date.getTime();

        return dateMs - startTimeMs <= endTimeMs - dateMs;
    };

    return (
        <div className="relative w-full h-full p-3 overflow-hidden">
            <div className="relative w-full h-full grid grid-cols-2 ps-1 pe-3 gap-3 overflow-auto custom-scrollbar">
                {availableHours?.map((d) => (
                    <button
                        className={`transition-all active:scale-95 text-white p-2 flex items-center justify-center border border-gray-300 rounded-xl cursor-pointer ${getStyle(d)}`}
                        key={d.getTime()}
                        onClick={() => select(d)}
                    >
                        {getTimings(d)}
                    </button>
                ))}
            </div>
            {(startTime || endTime) && (
                <button className="absolute left-3 bottom-3 p-1 rounded-lg bg-white cursor-pointer" onClick={reset}>
                    <img src={ResetIcon} alt="Reset choice" />
                </button>
            )}
        </div>
    );
};

export default CalendarTimePicker;
