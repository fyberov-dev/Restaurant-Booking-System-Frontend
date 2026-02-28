import { useContext, useState } from "react";
import useAvailableHours from "../../hooks/calendar/useAvailableHours";
import { BookingContext } from "../../context/BookingContext";
import ResetIcon from "../../assets/icons/reset.svg";
import useRestaurant from "../../hooks/restaurant/useRestaurant";

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
    const { bookedTables, clearBookedTables } = useContext(BookingContext);

    const { data: restaurant, isLoading } = useRestaurant();

    const [clickCounter, setClickCounter] = useState<number>(0);

    const [hoveredTime, setHoveredTime] = useState<Date | null>(null);

    const availableHours = useAvailableHours(selectedDate);

    const getTimings = (date: Date) => {
        return `${formatTiming(date.getHours())}:${formatTiming(date.getMinutes())}`;
    };

    const formatTiming = (num: number) => {
        return num <= 9 ? `0${num}` : String(num);
    };

    const select = (d: Date) => {
        if (startTime?.getTime() === d.getTime() || endTime?.getTime() === d.getTime()) {
            return;
        }

        setClickCounter(clickCounter + 1);

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

            if (bookedTables) {
                clearBookedTables();
            }

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
        return (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 <= restaurant?.maxBookHours;
    };

    const getStyle = (d: Date) => {
        if (d.getTime() === startTime?.getTime()) {
            return "bg-blue-800/60";
        }

        if (
            startTime &&
            hoveredTime &&
            d <= hoveredTime &&
            d > startTime &&
            isInsideMaxBookTime(startTime, d) &&
            isInsideMaxBookTime(startTime, hoveredTime)
        ) {
            if (!endTime || (endTime && endTime.getTime() !== d.getTime())) {
                return "bg-blue-800/30";
            }
        }

        if (d.getTime() === endTime?.getTime()) {
            return "bg-blue-700/60";
        }

        if (startTime && startTime < d && endTime && endTime > d) {
            if (isStartTimingCloser(d)) {
                return "bg-blue-600/20 hover:bg-blue-600/20 active:bg-blue-600/40";
            } else {
                return "bg-blue-600/15 hover:bg-blue-700/20 active:bg-blue-700/40";
            }
        }

        if (startTime && d > startTime && isInsideMaxBookTime(startTime, d)) {
            return "bg-gray-600/10 opacity-80 hover:bg-gray-600/60 active:bg-gray-600/100";
        }

        if (
            endTime &&
            startTime &&
            d < startTime &&
            d.getTime() != startTime.getTime() &&
            isInsideMaxBookTime(d, endTime)
        ) {
            return "bg-gray-600/10 opacity-80 hover:bg-gray-600/60 active:bg-gray-600/100";
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

    const getTempDuration = () => {
        const end = hoveredTime ?? endTime;

        if (!startTime || !end) {
            return "";
        }

        const startTimeMs = startTime.getTime();
        const hoveredTimeMs = end.getTime();

        const durationMs = hoveredTimeMs - startTimeMs;

        const hours = Math.floor(durationMs / 1000 / 60 / 60);
        const minutes = Math.floor(durationMs / 1000 / 60) % 60;

        return (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "min" : "");
    };

    const updateHoveredTime = (d: Date) => {
        if (startTime && d > startTime && isInsideMaxBookTime(startTime, d)) {
            setHoveredTime(d);
        }
    };

    const removeHoveredTime = () => {
        if (hoveredTime) {
            setHoveredTime(null);
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden">
            {!isLoading && (
                <>
                    <div className="relative w-full h-full py-3 overflow-hidden">
                        <div className="relative w-full h-full grid grid-cols-3 ps-3 pe-3 gap-1 overflow-auto custom-scrollbar select-none">
                            {availableHours?.map((d) => (
                                <button
                                    className={`transition-all active:scale-95 text-white p-2 flex items-center justify-center border border-gray-300 rounded-xl cursor-pointer ${getStyle(d)}`}
                                    key={d.getTime()}
                                    onClick={() => select(d)}
                                    onMouseEnter={() => updateHoveredTime(d)}
                                    onMouseLeave={() => removeHoveredTime()}
                                >
                                    {getTimings(d)}
                                </button>
                            ))}
                        </div>
                        <button
                            className={`absolute transition-all left-3 bottom-3 p-1 rounded-lg bg-white/50 ring ring-white cursor-pointer ${startTime || endTime ? "opacity-100" : "translate-y-6 opacity-0"}`}
                            onClick={reset}
                        >
                            <img src={ResetIcon} alt="Reset choice" />

                            {clickCounter > 5 && clickCounter < 10 && (
                                <div className="absolute animate-[ping_3s_cubic-bezier(0,0.1,0,1)_infinite] w-full h-full bg-white left-1/2 top-1/2 -translate-1/2 rounded-lg"></div>
                            )}
                        </button>
                    </div>
                    <div className="border-t border-gray-600 flex items-center justify-between py-2 px-3">
                        <p className="text-white">{getTempDuration()}</p>
                        <p className="text-white">Max reservation: {restaurant?.maxBookHours} hours</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarTimePicker;
