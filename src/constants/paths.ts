const API_BASE = "/api";
const API_V1 = API_BASE + "/v1";

export const PATHS = {
    GET_TABLES: API_V1 + "/table",
    GET_RATING: API_V1 + "/rating",
    POST_BOOKING: API_V1 + "/book",
    GET_RESTAURANT: API_V1 + "/restaurant",
} as const;
