export interface INote {
    id: string;
    title: string;
    description: string;
}

export interface INotes {
    notes: INote[];
}