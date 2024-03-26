import { INotes } from '@/interface/notes_interface';
import { NoteForm } from './NoteForm';
import { LAYOUT } from '@/const/enums';
import { Button } from './ui/button';
import { CardIcon, ListIcon } from './ui/icones';

interface Props {
  notes: INotes;
  setNotes: React.Dispatch<React.SetStateAction<INotes>>;
  toggleLayout: React.Dispatch<LAYOUT>;
  layout: string;
}

export default function Header({notes, setNotes, toggleLayout, layout}: Props) {

  console.log(layout)

    function createNewNote (newNote: INote) {
        setNotes([...notes, newNote])
    }

  return (
    <div className="flex justify-between mb-4 p-4 border-b-2">
        <NoteForm createNewNote={createNewNote}/>
        <Button variant="outline" size="icon" onClick={(e) => toggleLayout(e)}>
      { 
      layout === 'card' ? (<CardIcon className="h-4 w-4" />) : (<ListIcon className="h-4 w-4" />)
    }
    </Button>
    </div>
  )
}
