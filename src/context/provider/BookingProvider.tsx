import type React from "react";
import { BookingContext, type BookingContextType } from "../BookingContext";
import { useState } from "react";
import type { Booking } from "../../types/booking/Booking";

interface BookingProviderType {
    children: React.ReactNode;
}

const BookingProvider = ({ children }: BookingProviderType) => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const clearBookings = () => {
        setBookings([]);
    };

    return (
        <BookingContext.Provider
            value={
                {
                    bookings,
                    setBookings,
                    clearBookings,
                } satisfies BookingContextType
            }
        >
            {children}
        </BookingContext.Provider>
    );
};

export default BookingProvider;
