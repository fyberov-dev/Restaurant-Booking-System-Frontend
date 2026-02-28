export interface TableType {
    type: string;
    title: string;
}

export interface Table {
    id: number;
    guests: number;
    x: number;
    y: number;
    isVertical: boolean;
    types: TableType[];
    createdAt: string;
    updatedAt: string;
}
