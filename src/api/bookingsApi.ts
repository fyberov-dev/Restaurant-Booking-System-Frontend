import axios from "axios";
import { PATHS } from "../constants/paths";
import type { FilteredTablesDto } from "../types/table/FilteredTablesDto";
import type { Booking } from "../types/booking/Booking";

interface GetParams {
    startTime: string;
    endTime: string;
    guests: number;
    type: string | null;
}

const get = async ({ startTime, endTime, guests, type }: GetParams) => {
    const response = await axios.get<FilteredTablesDto>(PATHS.GET_RATING, {
        params: { startTime, endTime, guests, type },
    });

    return response.data;
};

export interface CreateBookingParams {
    tableId: number;
    phone: string;
    email: string;
    startsAt: string;
    endsAt: string;
}

const post = async (params: CreateBookingParams) => {
    const response = await axios.post<Booking>(PATHS.POST_BOOKING, params);

    return response.data;
};

export default { get, post };
