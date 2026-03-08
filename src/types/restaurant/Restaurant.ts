export interface RestaurantDto {
    openTime: string;
    closeTime: string;
    timingsStep: number;
    maxBookHours: number;
    availableTimings: string[];
    zoneId: string;
    createdAt: string;
    updatedAt: string;
}
