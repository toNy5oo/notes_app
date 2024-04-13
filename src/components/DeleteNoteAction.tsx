import useSWRMutation from "swr/mutation";
import { useNotes } from "./NoteContext";
import { useEffect } from "react";
import { showNoteDeletedToast } from "@/service/Notifications";
import { INote } from "@/interface/notes_interface";
import { LoaderCircle, Trash2 } from "lucide-react";
import { iconProps } from "@/const/styles";
import { ROUTES } from "@/const/routes";

interface Props {
    note: INote
}
  
export function DeleteNoteAction({ note}: Props) {
    const { setNotes } = useNotes();
  const { trigger: deleteNoteTrigger, data: deleteNoteData, isMutating: isDeleting }= useSWRMutation(ROUTES.DELETE, deleteNote);

  useEffect(() => {
    if (deleteNoteData) {
      setNotes(prev => ({
        pinned: prev.pinned.filter(note => note.id !== deleteNoteData.id),
        others: prev.others.filter(note => note.id !== deleteNoteData.id),
      }));
      showNoteDeletedToast(deleteNoteData);
    }
  }, [deleteNoteData, showNoteDeletedToast]);

  return (
    <>
    {isDeleting ? (
        <LoaderCircle {...iconProps} className="animate-spin" onClick={() => deleteNoteTrigger(note.id)} />
      ) : (
        <Trash2 {...iconProps} onClick={() => deleteNoteTrigger(note.id)} />
      )}
    </>
  )
}

async function deleteNote(url: string, { arg }: { arg: string }) {
    return fetch(url+arg, {
      method: 'DELETE',
    }).then(res => res.json())
  }