import { INotes } from '@/interface/notes_interface';
import { Button } from './ui/button'
import { NoteForm } from './NoteForm';

interface Props {
  notes: INotes;
  setNotes: React.Dispatch<React.SetStateAction<INotes>>;
}

export default function Header({notes, setNotes}: Props) {

    function createNewNote () {
        const newNote = {
            title: "New Note",
            body: "This is a new note"
        }
        setNotes([...notes, newNote])
    }

  return (
    <div className="flex justify-between mb-4 p-4 border-b-2">
        <NoteForm />
        {/* <Button variant="destructive" onClick={createNewNote}>New Note</Button> */}
    </div>
  )
}
