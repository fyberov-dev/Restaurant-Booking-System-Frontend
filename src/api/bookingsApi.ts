import axios from "axios";
import { PATHS } from "../constants/paths";
import type { FilteredTablesDto } from "../types/table/FilteredTablesDto";

type GetParams = {
    startTime: string;
    endTime: string;
    guests: number;
    type: string | null;
};

const get = async ({ startTime, endTime, guests, type }: GetParams) => {
    const response = await axios.get<FilteredTablesDto>(PATHS.GET_BOOKINGS, {
        params: { startTime, endTime, guests, type },
    });

    return response.data;
};

export default { get };
