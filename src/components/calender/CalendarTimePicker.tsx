import { useContext, useState } from "react";
import useAvailableHours from "../../hooks/calendar/useAvailableHours";
import { BookingContext } from "../../context/BookingContext";
import ResetIcon from "../../assets/icons/reset.svg";
import useRestaurant from "../../hooks/restaurant/useRestaurant";
import { getDuration, getTiming } from "../../util/timeUtil";
import useFetchBookings from "../../hooks/booking/useFetchBookings";

interface CalendarTimePickerProps {
    selectedDate: Date;
    reset: () => void;
}

const CalendarTimePicker = ({ selectedDate, reset }: CalendarTimePickerProps) => {
    const { bookedTables, startTime, endTime, setStartTime, setEndTime, clearBookedTables } =
        useContext(BookingContext);

    const { fetch } = useFetchBookings();

    const { data: restaurant, isLoading } = useRestaurant();

    const [clickCounter, setClickCounter] = useState<number>(0);

    const [hoveredTime, setHoveredTime] = useState<Date | null>(null);

    const availableHours = useAvailableHours(selectedDate);

    const updateStartTime = (date: Date | null) => {
        setStartTime(date);

        if (endTime && date) {
            fetch(date, endTime);
        }
    };

    const updateEndTime = (date: Date | null) => {
        setEndTime(date);

        if (startTime && date) {
            fetch(startTime, date);
        }
    };

    const updateStartAndEndTimes = (startTime: Date | null, endTime: Date | null) => {
        setStartTime(startTime);
        setEndTime(endTime);

        if (startTime && endTime) {
            fetch(startTime, endTime);
        }
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
            updateStartAndEndTimes(d, null);
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
        return (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 <= restaurant!.maxBookHours;
    };

    const getStyle = (date: Date) => {
        if (startTime && endTime && hoveredTime) {
            if (date >= startTime && date <= hoveredTime && isStartTimingCloser(hoveredTime)) {
                if (date.getTime() === hoveredTime.getTime()) {
                    return getActiveStyle();
                }

                if (date.getTime() === startTime.getTime()) {
                    return "ring ring-blue-600/30";
                }

                return "opacity-10";
            }

            if (isInsideMaxBookTime(startTime, date) && !isStartTimingCloser(hoveredTime) && date >= hoveredTime) {
                if (date.getTime() === hoveredTime.getTime()) {
                    return getActiveStyle();
                }

                if (date.getTime() === endTime.getTime()) {
                    return "ring ring-blue-600/30";
                }

                return "opacity-100";
            }

            if (
                hoveredTime > endTime &&
                date >= endTime &&
                isInsideMaxBookTime(startTime, date) &&
                date <= hoveredTime
            ) {
                if (date.getTime() === hoveredTime.getTime()) {
                    return getActiveStyle();
                }

                if (date.getTime() === endTime.getTime()) {
                    return getActiveStyle();
                }

                return "bg-blue-600/10";
            }
        }

        if (startTime && endTime) {
            if (date < startTime || !isInsideMaxBookTime(startTime, date)) {
                return "opacity-10";
            }

            if (date > startTime && endTime > date) {
                if (isStartTimingCloser(date)) {
                    return "bg-blue-800/10";
                } else {
                    return "bg-blue-600/10";
                }
            }
        }

        if (startTime && !endTime && (!isInsideMaxBookTime(startTime, date) || date < startTime)) {
            return "opacity-10";
        }

        if (startTime?.getTime() === date.getTime()) {
            return getActiveStyle();
        }

        if (endTime?.getTime() === date.getTime()) {
            return getActiveStyle();
        }

        return "hover:bg-blue-600/30 hover:ring hover:ring-blue-600 hover:shadow-lg hover:shadow-blue-600/30";
    };

    const getActiveStyle = () => {
        return "bg-blue-600/30 ring ring-blue-600 shadow-lg shadow-blue-600/30";
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

        return getDuration(startTime, end);
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
                    <div className="relative w-full h-full py-1 overflow-hidden">
                        <div className="relative w-full h-full grid grid-cols-2 px-1 gap-1 overflow-auto custom-scrollbar select-none">
                            {availableHours?.map((d) => (
                                <button
                                    className={`transition-all active:scale-95 text-white p-2 flex items-center justify-center border border-neutral-800 rounded-xl cursor-pointer ${getStyle(d)}`}
                                    key={d.getTime()}
                                    onClick={() => select(d)}
                                    onMouseEnter={() => updateHoveredTime(d)}
                                    onMouseLeave={() => removeHoveredTime()}
                                >
                                    {getTiming(d)}
                                </button>
                            ))}
                        </div>
                        <button
                            className={`absolute transition-all left-3 bottom-3 p-1 rounded-lg bg-neutral-950/10 ring ring-neutral-800 hover:ring-neutral-600 shadow-xs shadow-neutral-950 cursor-pointer ${startTime || endTime ? "opacity-100 block" : "translate-y-6 opacity-0"}`}
                            onClick={reset}
                        >
                            <img src={ResetIcon} alt="Reset choice" />

                            {clickCounter > 5 && clickCounter < 10 && (
                                <div className="absolute animate-[ping_3s_cubic-bezier(0,0.1,0,1)_infinite] w-5/6 h-5/6 bg-white left-1/2 top-1/2 -translate-1/2 rounded-lg"></div>
                            )}
                        </button>
                    </div>
                    <div className="border-t border-neutral-800 flex items-center justify-between py-2 px-3">
                        <p className="text-white">{getTempDuration()}</p>
                        <p className="text-white">Max reservation: {restaurant?.maxBookHours} hours</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarTimePicker;
