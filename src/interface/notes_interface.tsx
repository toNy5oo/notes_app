export interface INote {
  id: string;
  title: string;
  description: string;
  color: string;
  isPinned: boolean;
  createdAt: string;
}

export interface INotes {
  notes: INote[];
}
