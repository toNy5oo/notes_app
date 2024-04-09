import { INote } from "@/interface/notes_interface";
import { NoteDialog } from "./NoteDialog";
import { useEffect, useState } from "react";
import { NoteActions } from "./NoteActions";
import { LoaderCircle, Pin, PinOff } from "lucide-react";
import { cardStyles, listStyles, pinStyle, spinnerProps } from "@/const/styles";
import useSWRMutation from "swr/mutation";
import { ROUTES } from "@/const/routes";
import { useNotes } from "./NoteContext";

interface Props {
  note: INote;
  isCard?: boolean;
}

async function togglePin(url: string, { arg }: { arg: string}) {
  return fetch(url+arg, {
    method: 'PUT',
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json())
}

export function NoteContent({  note, isCard = false }: Props) {

  const { setNotes } = useNotes()

  const {
    trigger: togglePinTrigger, data, isMutating  } = useSWRMutation(ROUTES.TOGGLE_PIN, togglePin, /* options */)

  const [isHover, setIsHover] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  // const openNoteDialog = () => setIsAlertDialogOpen(true);
  const closeNoteDialog = () => {
    setIsAlertDialogOpen(false);
    setIsHover(false);
  };

  useEffect(() => {
    if (data){
      setNotes(currentNotes => {
        return currentNotes.map(note => {
          if (note.id === data.id) {
            return { ...note, pinned: !note.pinned };
          }
          return note;
        })});
    }
  }, [data])
  
  return (
    <>
      <div 
      className={`flex flex-col px-5 justify-between text-start z-10 ${isCard ? cardStyles : listStyles}`} 
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      
      style={{borderTop: `10px solid ${note.color}`,}}>
      
        <div>
          <div className={`flex justify-between items-center`}>
            <p className="font-semibold text-md">{note.title}</p>
            {isHover && (
            note.pinned 
            ? isMutating ? <LoaderCircle {...spinnerProps} className="animate-spin" /> : <Pin {...pinStyle} onClick={() => togglePinTrigger(note.id)}/>
            : isMutating ? <LoaderCircle {...spinnerProps} className="animate-spin" /> : <PinOff {...pinStyle} onClick={() => togglePinTrigger(note.id)}/>
            )
            }
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
