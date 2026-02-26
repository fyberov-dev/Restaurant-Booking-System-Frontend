import { createContext } from "react";
import type { Booking } from "../types/booking/Booking";

export interface BookingContextType {
    bookings: Booking[];
    setBookings: (bookings: Booking[]) => void;
    clearBookings: () => void;
}

export const BookingContext = createContext<BookingContextType>({
    bookings: [],
    setBookings: () => undefined,
    clearBookings: () => undefined,
});
