import useRestaurant from "../restaurant/useRestaurant";

function useAvailableHours() {
    const { data: restaurant, isLoading } = useRestaurant();

    if (isLoading || !restaurant) return [];

    const dateTimes = restaurant.availableTimings.map((t) => new Date(t));

    return dateTimes;
}

export default useAvailableHours;
