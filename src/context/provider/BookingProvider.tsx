import type React from "react";
import { BookingContext, type BookingContextType } from "../BookingContext";
import { useState } from "react";
import type { Booking } from "../../types/booking/Booking";
import useBookings from "../../hooks/booking/useBookings";

interface BookingProviderType {
    children: React.ReactNode;
}

const BookingProvider = ({ children }: BookingProviderType) => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const { mutate: getBookingsMutate } = useBookings();

    const getBookings = (startTime: Date, endTime: Date) => {
        const startTimeStr = startTime.toISOString().slice(0, 19);
        const endTimeStr = endTime.toISOString().slice(0, 19);

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
    };

    return (
        <BookingContext.Provider
            value={
                {
                    bookings,
                    getBookings,
                } satisfies BookingContextType
            }
        >
            {children}
        </BookingContext.Provider>
    );
};

export default BookingProvider;
