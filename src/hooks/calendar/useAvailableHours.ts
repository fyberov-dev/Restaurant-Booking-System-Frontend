const minutesStep = 15;

const openingHours = 10;
const closingHours = 22;

function useAvailableHours(date: Date) {
    const closingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), closingHours, 0, 0, 0);

    let currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), openingHours, 0, 0, 0);

    const arr: Date[] = [];

    let i = 0;
    while (currentDate < closingDate) {
        currentDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            openingHours,
            minutesStep * i,
            0,
            0,
        );
        arr.push(currentDate);
        i++;
    }

    return arr;
}

export default useAvailableHours;
