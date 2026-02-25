import axios from "axios";
import type { Table } from "../types/table/Table";
import { PATHS } from "../constants/paths";

const getTables = async () => {
    const response = await axios.get<Table[]>(PATHS.GET_TABLES);

    return response.data;
};

export default {
    getTables,
};
