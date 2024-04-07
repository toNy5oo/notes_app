import { INote } from "@/interface/notes_interface";
import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

interface NoteContextType {
  notes: INote[]; 
  setNotes: React.Dispatch<SetStateAction<INote[]>>; 
}

// Create the context with a default undefined value
const NoteContext = createContext<NoteContextType | undefined>(undefined);

interface NoteProviderProps {
  children: ReactNode;
}

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useState<INote[]>([]);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

// Hook to use the context
export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNote must be used within a NoteProvider');
  }
  return context;
};