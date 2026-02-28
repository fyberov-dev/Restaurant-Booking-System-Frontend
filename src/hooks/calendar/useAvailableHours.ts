import useRestaurant from "../restaurant/useRestaurant";

function useAvailableHours(date: Date) {
    const { data: restaurant, isLoading } = useRestaurant();

    if (isLoading || !restaurant) return [];

    const openHours = +restaurant.openTime.split(":")[0];
    const closeHours = +restaurant.closeTime.split(":")[0];

    const closingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), closeHours);
    let currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), openHours);

    const arr: Date[] = [];

    let i = 0;
    while (currentDate < closingDate) {
        currentDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            openHours,
            restaurant.timingsStep * i,
        );

        arr.push(currentDate);
        i++;
    }

    return arr;
}

export default useAvailableHours;
