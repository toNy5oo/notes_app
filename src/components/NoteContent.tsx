import { parseColor } from "@/const/colorpicker_colors";
import { INote } from "@/interface/notes_interface";
import { NoteDialog } from "./NoteDialog";
import { useState } from "react";
import { Pin, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";

interface Props {
  note: INote;
  isCard?: boolean;
  deleteNote: (noteId: string) => void;
  togglePin: (noteId: string) => void;
}

export function NoteContent({ note, isCard = false, deleteNote, togglePin }: Props) {
  console.log(parseColor(note.color));
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

  const iconClasses = "cursor-pointer";

  const cardClasses = `bg-white w-[260px] max-h-[70px] pb-3 pt-2 hover:shadow-lg border p-3 rounded-md border-t-${parseColor(note.color)} border-t-thin cursor-pointer`
  const listClasses = `bg-white w-full border rounded-md p-4 hover:shadow-lg border-l-thin cursor-pointer`
  const cardClassesIcons = `animate-slideAndFadeFromTop w-[50%] mx-auto justify-around -mt-1 flex gap-1 border bg-cyan-600 p-3 rounded-md z-0`
  const listClassesIcons = `animate-slideAndFadeFromLeft p-2 my-1 flex flex-col gap-2 items-center justify-around border bg-cyan-600 rounded-md z-0 -ml-1`

  return (
    <div
     className={`flex justify-between ${isCard ? "flex-col" : ""}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div 
      className={`flex justify-between items-center z-10 ${isCard ? cardClasses : listClasses}`} 
       >
      
        <section className="truncate" onClick={openNoteDialog}> 
          <div className="font-semibold text-md flex justify-between items-center">
            {note.title}
          </div>
          <p className="text-xs truncate">{note.description}</p>
        </div>

        {isHover && (<NoteActions note={note} setIsDeleting={setIsDeleting} deleteNote={deleteNote} togglePin={togglePin} />)}
      </div>
     
      {isHover && (<div className={` ${isCard ? cardClassesIcons : listClassesIcons}`}>
      <Pin className={`${iconClasses}`} size={12} onClick={() => togglePin(note.id)}/>
          <Separator decorative orientation={`${isCard ? "vertical" : "horizontal"}`} />
          <Trash2 className={`${iconClasses}`}  size={12} onClick={(e) => {
                    setIsDeleting(true);
                    deleteNote(note.id);
                    setIsDeleting(false);
                  }}
          />
      </div>)}

      <NoteDialog
        isOpen={isAlertDialogOpen}
        onOpenChange={setIsAlertDialogOpen}
        onAction={showNoteDetails}
        onCancel={closeNoteDialog}
        note={note}
      />
    </div>
  );
}
