import { INote } from "@/interface/notes_interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface NoteContextType {
  notes: { pinned: INote[], others: INote[] };
  setNotes: React.Dispatch<React.SetStateAction<{ pinned: INote[], others: INote[] }>>;
  filteredNotes: { pinned: INote[], others: INote[] };
  setFilteredNotes: React.Dispatch<React.SetStateAction<{ pinned: INote[], others: INote[] }>>;
  applyFilter: (filter: { text: string, color: string }) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

interface NoteProviderProps {
  children: ReactNode;
}

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useState<{ pinned: INote[], others: INote[] }>({ pinned: [], others: [] });
  const [filteredNotes, setFilteredNotes] = useState<{ pinned: INote[], others: INote[] }>({ pinned: [], others: [] });
  const [currentFilter, setCurrentFilter] = useState<{ text: string, color: string }>({ text: "", color: "" });

  const applyFilter = (filter: { text: string, color: string }) => {
    setCurrentFilter(filter);
    const { text, color } = filter;
    const textLower = text.toLowerCase();

    setFilteredNotes({
      pinned: notes.pinned.filter(note =>
        note.title.toLowerCase().includes(textLower) &&
        (!color || note.color === color)
      ),
      others: notes.others.filter(note =>
        note.title.toLowerCase().includes(textLower) &&
        (!color || note.color === color)
      )
    });
  };

  useEffect(() => {
    applyFilter(currentFilter); // Reapply filter whenever notes change
  }, [notes, currentFilter]);

  return (
    <NoteContext.Provider value={{ notes, setNotes, filteredNotes, setFilteredNotes, applyFilter }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};