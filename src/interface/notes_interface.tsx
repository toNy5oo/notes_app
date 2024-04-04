export interface INote {
  id: string;
  title: string;
  description: string;
  color: string;
  createdAt: string;
}

export interface INotes {
  notes: INote[];
}
