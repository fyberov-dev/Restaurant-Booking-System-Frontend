import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../../constants/tanstack-query";
import BookingsApi from "../../api/bookingsApi";

function useBookings() {
    return useMutation({
        mutationKey: [MUTATION_KEYS.GET_BOOKINGS],
        mutationFn: BookingsApi.get,
    });
}

export default useBookings;
