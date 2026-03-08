import { useQuery } from "@tanstack/react-query";
import type { RestaurantDto } from "../../types/restaurant/Restaurant";
import { QUERY_KEYS } from "../../constants/tanstack-query";
import RestaurantApi from "../../api/restaurantApi";
import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

function useRestaurant() {
    const { selectedDate } = useContext(BookingContext);

    return useQuery<RestaurantDto>({
        queryKey: [QUERY_KEYS.RESTAURANT, { date: selectedDate }],
        queryFn: () => RestaurantApi.get(selectedDate),
    });
}

export default useRestaurant;
