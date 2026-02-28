export enum TableRating {
    PERFECT = "PERFECT",
    GOOD = "GOOD",
    BAD = "BAD",
    UNAVAILABLE = "UNAVAILABLE",
}

export type FilteredTablesDto = { [key: number]: TableRating };
