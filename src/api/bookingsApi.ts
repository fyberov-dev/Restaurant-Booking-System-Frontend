import axios from "axios";
import type { Booking } from "../types/booking/Booking";
import { PATHS } from "../constants/paths";

const get = async ({ startTime, endTime }: { startTime: string; endTime: string }) => {
    const response = await axios.get<Booking[]>(PATHS.GET_BOOKINGS, {
        params: { startTime, endTime },
    });

    return response.data;
};

export default { get };
