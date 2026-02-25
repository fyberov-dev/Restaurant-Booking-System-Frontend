import { createContext } from "react";
import type { Booking } from "../types/booking/Booking";

export interface BookingContextType {
    bookings: Booking[];
    getBookings: (startTime: Date, endTime: Date) => void;
}

export const BookingContext = createContext<BookingContextType>({
    bookings: [],
    getBookings: () => undefined,
});
