import BookingTab from "./components/booking/BookingTab";
import Calendar from "./components/calender/Calendar";
import RestaurantPlan from "./components/restaurant/RestaurantPlan";
import BookingProvider from "./context/provider/BookingProvider";

function App() {
    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-neutral-950 p-6 gap-3 overflow-hidden">
            <BookingProvider>
                <div className="relative h-full border border-neutral-800 rounded-xl">
                    <Calendar />
                </div>
                <div className="relative w-full h-full flex border border-neutral-800 rounded-xl overflow-hidden">
                    <RestaurantPlan />
                    <BookingTab />
                </div>
            </BookingProvider>
        </div>
    );
}

export default App;
