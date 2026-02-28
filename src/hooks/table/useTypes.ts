import useTables from "./useTables";

type TableTypeObjType = { [key: string]: string };

function useTypes() {
    const { data: tables, isLoading } = useTables();

    if (isLoading || !tables) return [];

    const types: TableTypeObjType = {};

    for (let i = 0; i < tables.length; i++) {
        const currentTableTypes = tables[i].types;

        for (let j = 0; j < currentTableTypes.length; j++) {
            const type = currentTableTypes[j];

            if (type.type in types) {
                continue;
            }

            types[type.type] = type.title;
        }
    }

    return types;
}

export default useTypes;
