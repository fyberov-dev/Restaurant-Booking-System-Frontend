export enum TableRating {
    BEST = "BEST",
    GOOD = "GOOD",
    BAD = "BAD",
    WORST = "WORST",
    UNAVAILABLE = "UNAVAILABLE",
}

export type FilteredTablesDto = { [key: number]: TableRating };
