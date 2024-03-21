import { INotes } from '@/interface/notes_interface';
import { NoteForm } from './NoteForm';

interface Props {
  notes: INotes;
  setNotes: React.Dispatch<React.SetStateAction<INotes>>;
}

export default function Header({notes, setNotes}: Props) {

    function createNewNote (newNote: INote) {
        setNotes([...notes, newNote])
    }

  return (
    <div className="flex justify-between mb-4 p-4 border-b-2">
        <NoteForm createNewNote={createNewNote}/>
    </div>
  )
}
