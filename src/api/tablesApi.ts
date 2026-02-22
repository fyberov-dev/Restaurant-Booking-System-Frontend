import axios from "axios";
import type { Table } from "../types/table/Table";
import { PATHS } from "../constants/paths";

const getTables = async () => {
    const response = await axios.get<Table[]>(PATHS.GET_TABLES);
    console.log(response.data);
    return response.data;
};

export default {
    getTables,
};
