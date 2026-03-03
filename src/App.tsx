import BookingTab from "./components/booking/BookingTab";
import Calendar from "./components/calender/Calendar";
import RestaurantPlan from "./components/restaurant/RestaurantPlan";
import BookingProvider from "./context/provider/BookingProvider";

function App() {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-neutral-950 p-6 gap-3">
            <BookingProvider>
                <div className="relative h-full border border-gray-600 rounded-lg">
                    <Calendar />
                </div>
                <div className="relative w-full h-full border border-gray-600 rounded-lg">
                    <RestaurantPlan />
                </div>

                <BookingTab />
            </BookingProvider>
        </div>
    );
}

export default App;
