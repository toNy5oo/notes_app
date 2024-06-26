import { iconProps} from "@/const/styles";
import { INote } from "@/interface/notes_interface";
import { LoaderCircle, Pin, PinOff } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { useNotes } from "./NoteContext";
import { useEffect } from "react";
import { ROUTES } from "@/const/routes";

interface PinProps {
    note: INote
}
  
export function PinAction({ note}: PinProps) {
    const {
        trigger: togglePinTrigger, data, isMutating  } = useSWRMutation(ROUTES.TOGGLE_PIN, togglePin, /* options */)

    const { setNotes } = useNotes()

    useEffect(() => {
      if (data) {
        setNotes(currentNotes => {
          // Determine where the note belongs and where it should be removed from.
          const targetArray = data.pinned ? 'pinned' : 'others';
          const sourceArray = data.pinned ? 'others' : 'pinned';
    
          // Only filter the source array where the note is to be removed.
          const filteredSourceArray = currentNotes[sourceArray].filter(note => note.id !== data.id);
    
          // Add the note to the target array if it's not already present.
          const updatedTargetArray = currentNotes[targetArray].some(note => note.id === data.id)
            ? [...currentNotes[targetArray]]
            : [...currentNotes[targetArray], data];
    
          // Return the updated notes object with modifications only where necessary.
          return {
            ...currentNotes,
            [sourceArray]: filteredSourceArray,
            [targetArray]: updatedTargetArray,
          };
        });
      }
    }, [data]);
    

  return (
    <>
{    
        note.pinned 
        ? isMutating 
                ?  <LoaderCircle {...iconProps} className="animate-spin" /> 
                :  <PinOff {...iconProps} onClick={() => togglePinTrigger(note.id)}/>
        : isMutating 
                ? <LoaderCircle {...iconProps} className="animate-spin" /> 
                : <Pin {...iconProps} onClick={() => togglePinTrigger(note.id)}/>
}
    </>
  )
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
