const API_BASE = "/api";
const API_V1 = API_BASE + "/v1";

export const PATHS = {
    GET_TABLES: API_V1 + "/table",

    GET_BOOKINGS: API_V1 + "/book",
} as const;
