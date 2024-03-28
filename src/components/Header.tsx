import { INote, INotes } from '@/interface/notes_interface';
import { NoteForm } from './NoteForm';
import { LAYOUT } from '@/const/enums';
import { Button } from './ui/button';
import { CardIcon, ListIcon } from './ui/icones';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "./ui/toaster";

interface Props {
  notes: INotes;
  setNotes: React.Dispatch<React.SetStateAction<INotes>>;
  toggleLayout: React.Dispatch<LAYOUT>;
  layout: string;
}

export default function Header({notes, setNotes, toggleLayout, layout}: Props) {

  const { toast } = useToast()

    function createNewNote (newNote: INote) {
        setNotes([...notes, newNote])
        showToast(newNote.title);
    }

    function showToast(noteTitle: string) {
      toast({
        title: "Created",
        description: "Your new note "+noteTitle+" has been added.",
      })
    }

  return (
    <>
    <div className="flex justify-between mb-4 p-4 border-b-2">
        <NoteForm createNewNote={createNewNote}/>
        <Button variant="outline" size="icon" onClick={(e) => toggleLayout(e)}>
      { 
      layout === 'card' ? (<ListIcon className="h-4 w-4" />) : (<CardIcon className="h-4 w-4" />)
    }
    </Button>
    
    </div>
    <Toaster />
    </>
  )
}
