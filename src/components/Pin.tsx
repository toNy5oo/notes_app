import { pinStyle, spinnerProps } from "@/const/styles";
import { INote } from "@/interface/notes_interface";
import { LoaderCircle, Pin, PinOff } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { useNotes } from "./NoteContext";
import { useEffect } from "react";
import { ROUTES } from "@/const/routes";

interface PinProps {
    isHover: boolean,
    note: INote
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

  
export default function NotePin({isHover, note}: PinProps) {
    const {
        trigger: togglePinTrigger, data, isMutating  } = useSWRMutation(ROUTES.TOGGLE_PIN, togglePin, /* options */)
    

    const { setNotes } = useNotes()

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
    {
    isHover && (
        note.pinned 
        ? isMutating 
                ?  <LoaderCircle {...spinnerProps} className="animate-spin" /> 
                :  <Pin {...pinStyle} onClick={() => togglePinTrigger(note.id)}/>
        : isMutating 
                ? <LoaderCircle {...spinnerProps} className="animate-spin" /> 
                : <PinOff {...pinStyle} onClick={() => togglePinTrigger(note.id)}/>
        )
    }  
    </>
  )
}
