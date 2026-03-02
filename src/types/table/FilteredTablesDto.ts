export type TableRating = "PERFECT" | "AVAILABLE" | "BAD" | "UNAVAILABLE";

export type FilteredTablesDto = { [key: number]: TableRating };
