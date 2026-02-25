import CalendarProvider from "../../context/provider/CalendarProvider";
import CalendarDatePicker from "./CalendarDatePicker";
import CalendarTimePicker from "./CalendarTimePicker";

const Calendar = () => {
    console.log("[LOG] [Calendar] [Calendar] Rerendered");

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden">
            <CalendarProvider>
                <div className="w-full p-6 flex items-center justify-start border-b border-gray-600">
                    <p className="text-white text-xl">Book the table</p>
                </div>
                <div className="px-3 flex flex-col gap-3 border-b border-gray-600 py-3">
                    <p className="text-white">Pick date:</p>
                    <CalendarDatePicker />
                </div>
                <div className="relative w-full h-full p-3 overflow-hidden">
                    <CalendarTimePicker />
                </div>
            </CalendarProvider>
        </div>
    );
};

export default Calendar;
