export interface INote {
    id: number;
    title: string;
    description: string;
}

export interface INotes {
    notes: INote[];
}