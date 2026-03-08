import axios from "axios";
import { PATHS } from "../constants/paths";
import type { RestaurantDto } from "../types/restaurant/Restaurant";

const get = async (date: Date) => {
    const response = await axios.get<RestaurantDto>(PATHS.GET_RESTAURANT, {
        params: {
            date,
        },
    });

    return response.data;
};

export default {
    get,
};
