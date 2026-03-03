import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../../constants/tanstack-query";
import BookingsApi, { type CreateBookingParams } from "../../api/bookingsApi";
import type { AxiosError } from "axios";
import type { Booking } from "../../types/booking/Booking";
import type { ErrorResponse } from "../../types/api/ApiResponse";

function useCreateBooking() {
    return useMutation<Booking, AxiosError<ErrorResponse>, CreateBookingParams>({
        mutationKey: [MUTATION_KEYS.POST_BOOKING],
        mutationFn: BookingsApi.post,
    });
}

export default useCreateBooking;
