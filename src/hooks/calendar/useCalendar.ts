import { useMemo, useState } from "react";

const daysOfTheWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

function useCalendar() {
    console.log("[LOG] [Calendar] [useCalendar] Rerendered");

    const now = new Date();

    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();

    const calendar = useMemo(() => {
        const firstDateOfMonth = new Date(year, month, 1);
        const firstDayOfMonth = (firstDateOfMonth.getDay() + 6) % 7;
        const offset = Math.abs(1 - firstDayOfMonth);

        const calendar: Date[] = [];

        for (let i = 0; i < 42; i++) {
            calendar.push(new Date(year, month, i - offset));
        }

        return calendar;
    }, [year, month]);

    const prevMonth = () => {
        setSelectedMonth(new Date(year, month - 1, now.getDate()));
    };

    const nextMonth = () => {
        setSelectedMonth(new Date(year, month + 1, now.getDate()));
    };

    const activeDate = `${months[month]}, ${year}`;

    return {
        daysOfTheWeek,
        selectedMonth,
        activeDate,
        now,
        nextMonth,
        prevMonth,
        data: calendar,
    };
}

export default useCalendar;
