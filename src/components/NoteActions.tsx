import { colors } from '@/const/colorpicker_colors';
import { INote } from '@/interface/notes_interface';
import { Palette, Pin, Trash2 } from 'lucide-react';
import { CirclePicker } from 'react-color';


interface NoteActionsProps{
    note: INote,
    setIsDeleting:  React.Dispatch<React.SetStateAction<boolean>>,
    deleteNote: (noteId: string) => void;
  togglePin: (noteId: string) => void;
}
const iconProps = {
    color: 'grey',
    size: 20
}

const iconClasses = "cursor-pointer";

function changeColor(color: string) {
    //TODO: Call uri/note/update to change color
    console.log(color)
}

export default function NoteActions({note, togglePin, deleteNote, setIsDeleting}: NoteActionsProps) {
  return (
    <div className='flex justify-around w-full animate-slideAndFadeFromBottom'>
          <Palette {...iconProps} className={`${iconClasses}`} onClick={(e) => {
          e.stopPropagation();
          <CirclePicker colors={colors} color={note.color} onChangeComplete={(color) => changeColor(color.hex)} />
          }}
          />
          <Trash2 {...iconProps} className={`${iconClasses} hover:text-red-600`}  onClick={(e) => {
                    setIsDeleting(true);
                    deleteNote(note.id);
                    setIsDeleting(false);
                  }}
          />
  </div>
  )
}
