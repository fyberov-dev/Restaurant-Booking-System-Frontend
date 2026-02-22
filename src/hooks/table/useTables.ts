import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/tanstack-query";
import type { Table } from "../../types/table/Table";
import TablesApi from "../../api/tablesApi";

function useTables() {
    return useQuery<Table[]>({
        queryKey: [QUERY_KEYS.TABLES],
        queryFn: TablesApi.getTables,
    });
}

export default useTables;
