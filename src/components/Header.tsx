import { INote, INotes } from "@/interface/notes_interface";
import { NoteForm } from "./NoteFormDialog";
import { LAYOUT } from "@/const/enums";
import { Button } from "./ui/button";
import { CardIcon, ListIcon } from "./ui/icones";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "./ui/toaster";
import { ROUTES } from "@/const/routes";
import { useNotes } from "./NoteContext";

interface Props {
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  toggleLayout: () => void;
  toggleLayout: React.Dispatch<LAYOUT>;
  layout: string;
}

export default function Header({
  toggleLayout,
  layout,
}: Props) {
  async function createNote(note: INote): Promise<INote> {
    const response = await fetch(ROUTES.CREATE, {
      method: "POST",
     const { setNotes } = useNotes();
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const result = await response.json();
    console.log(result);
    return result;
  }

  const { toast } = useToast();

  //TODO: Improve performance and clean up
  async function createNewNote(newNote: INote) {
    const newId = Math.random().toString();
    newNote = { ...newNote, id: newId };
    const result = await createNote(newNote);

    if (result) {
      setNotes([...notes, newNote]);
      showToast(newNote.title);
    }
  }

  function showToast(noteTitle: string) {
    toast({
      title: "Created",
      description: "Your new note " + noteTitle + " has been added.",
    });
  }

  return (
    <>
      <div className="flex justify-between mb-4 p-4 border-b-2">
        <NoteForm createNewNote={createNewNote} />
        <Button variant="outline" size="icon" onClick={(e) => toggleLayout(e)}>
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
