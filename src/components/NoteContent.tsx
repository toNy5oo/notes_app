import { INote } from "@/interface/notes_interface";
import { NoteDialog } from "./NoteDialog";
import { useState } from "react";
import { NoteActions } from "./NoteActions";
import { noteStyle} from "@/const/styles";
import NotePin from "./Pin";

interface Props {
  note: INote;
}

export function NoteContent({ note }: Props) {

  const [isHover, setIsHover] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const openNoteDialog = () => setIsAlertDialogOpen(true);
  const closeNoteDialog = () => {
    setIsAlertDialogOpen(false);
    setIsHover(false);
  };
  
  return (
    <>
      <div 
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{borderTop: `10px solid ${note.color}`}}
      className={`${noteStyle} relative`}>
      
        <div onClick={openNoteDialog}>
          <div className={`flex justify-between items-center`}>
            <p className="font-semibold text-md">{note.title}</p>
            <NotePin isHover={isHover} note={note} />
          </div>
          <p className="text-xs">{note.description}</p>
        </div>

        {isHover && (<NoteActions note={note} />)}
      </div>
     
      <NoteDialog
        isOpen={isAlertDialogOpen}
        onAction={() => null}
        onOpenChange={setIsAlertDialogOpen}
        onCancel={closeNoteDialog}
        note={note}
      />
    </>
  );
}
