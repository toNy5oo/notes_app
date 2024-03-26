import { INote } from "@/interface/notes_interface";
import { Button } from "./ui/button";

interface Props {
    note: INote;
    deleteNote: (id: number) => void;
  }

export default function ListItem({note, deleteNote}: Props) {
  return (
    <section className="border rounded-md bg-slate-50 flex justify-between p-4">
        <div>
        <p className="font-semibold text-xl text-start">
        {note.title}
        </p>
        <p>
        {note.description}
        </p>
        </div>
        <div>
        <Button onClick={() => deleteNote(note.id)}>Delete</Button>
        </div>
    </section>
  )
}
