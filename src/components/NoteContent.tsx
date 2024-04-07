import { parseColor } from "@/const/colorpicker_colors";
import { INote } from "@/interface/notes_interface";
import { NoteDialog } from "./NoteDialog";
import { useState } from "react";
import NoteActions from "./NoteActions";
import { Pin, PinOff } from "lucide-react";
import { pinStyle } from "@/const/styles";
import { useNotes } from "./NoteContext";

interface Props {
  note: INote;
  isCard?: boolean;
  deleteNote: (noteId: string) => void;
  togglePin: (noteId: string) => void;
}

export function NoteContent({ note, isCard = false, deleteNote, togglePin }: Props) {
  const { setNotes } = useNotes()
  const [isHover, setIsHover] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openNoteDialog = () => setIsAlertDialogOpen(true);
  const closeNoteDialog = () => {
    setIsAlertDialogOpen(false);
    setIsHover(false);
  };

  const showNoteDetails = () => {
    deleteNote(note.id);
    closeNoteDialog();
  };

  
  const cardClasses = `bg-white w-[300px] min-h-[250px] max-h-[400px] pb-3 pt-2 hover:shadow-lg border p-3 rounded-md border-t-${parseColor(note.color)} border-t-thin`
  const listClasses = `bg-white w-[70%] min-h-[200px] max-h-[400px] mx-auto border rounded-md p-4 hover:shadow-lg border-l-thin cursor-pointer`

  return (
    <>
      <div 
      className={`flex flex-col px-5 justify-between text-start z-10 ${isCard ? cardClasses : listClasses}`} 
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={openNoteDialog}>
      
        <div className="">
          <div className={`flex justify-between items-center border-t-${parseColor(note.color)}}`}>
            <p className="font-semibold text-md">{note.title}</p>
            {/* {isHover && (
            note.isPinned 
            ? <Pin {...pinStyle} onClick={() => togglePin(note.id)}/>
            : <PinOff {...pinStyle} onClick={() => togglePin(note.id)}/>
            )
            } */}
          </div>
          <p className="text-xs">{note.description}</p>
        </div>

        {isHover && (<NoteActions note={note} setIsDeleting={setIsDeleting} deleteNote={deleteNote} togglePin={togglePin} />)}
      </div>
     
      <NoteDialog
        isOpen={isAlertDialogOpen}
        onOpenChange={setIsAlertDialogOpen}
        onAction={showNoteDetails}
        onCancel={closeNoteDialog}
        note={note}
      />
    </>
  );
}
