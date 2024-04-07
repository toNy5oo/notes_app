import { INote } from "@/interface/notes_interface";
import { NoteForm } from "./NoteFormDialog";
import { Button } from "./ui/button";
import { CardIcon, ListIcon } from "./ui/icones";
import { Toaster } from "./ui/toaster";
import { ROUTES } from "@/const/routes";
import useSWRMutation from 'swr/mutation'
import { showErrorToast, showNoteCreatedToast } from "@/service/Notifications";
import { useEffect } from "react";
import { LoadingOverlay } from "./LoadingOverlay";
import { useNotes } from "./NoteContext";

interface Props {
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  toggleLayout: () => void;
  layout: string;
}

async function createNote(url: string, { arg }: { arg: INote}) {
  
  const newId = Math.random().toString();
  arg = { ...arg, id: newId };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json())
}

export default function Header({
  toggleLayout,
  layout,
}: Props) {
  const {
     trigger: createNoteTrigger, data, isMutating } = useSWRMutation(ROUTES.CREATE, createNote, /* options */)

     const { setNotes } = useNotes();

  useEffect(() => {
    if (data) { 
      setNotes(prevNotes => [...prevNotes, data]);
      showNoteCreatedToast(data.title);
    }
  }, [data]);

  async function createNewNote(newNote: INote) {
    try {
      await createNoteTrigger(newNote);
    } catch (error: any) {
      console.error("Error creating new note:", error);
      showErrorToast(error.message);
    }
  }

    return (
    <>
    {isMutating && <LoadingOverlay />}
      <div className="flex justify-between mb-4 p-4 border-b-2">
        <NoteForm createNewNote={createNewNote} />
        <Button variant="outline" size="icon" onClick={() => toggleLayout()}>
          {layout === "card" ? (
            <ListIcon className="h-4 w-4" />
          ) : (
            <CardIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      <Toaster />
    </>
  );
}
