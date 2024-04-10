export interface INote {
  id: string;
  title: string;
  description: string;
  color: string;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotes {
  notes: INote[];
}
