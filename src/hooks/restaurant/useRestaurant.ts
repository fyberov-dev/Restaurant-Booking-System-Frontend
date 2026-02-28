import { useQuery } from "@tanstack/react-query";
import type { RestaurantDto } from "../../types/restaurant/Restaurant";
import { QUERY_KEYS } from "../../constants/tanstack-query";
import RestaurantApi from "../../api/restaurantApi";

function useRestaurant() {
    return useQuery<RestaurantDto>({
        queryKey: [QUERY_KEYS.RESTAURANT],
        queryFn: RestaurantApi.get,
    });
}

export default useRestaurant;
