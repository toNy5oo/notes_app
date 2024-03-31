import { INote } from "@/interface/notes_interface";
import { Button } from "./ui/button";
import { DeleteBin } from "./ui/icones";

interface Props {
    note: INote;
    deleteNote: (id: string) => string;
  }

export default function ListItem({note, deleteNote}: Props) {
  return (
      <section className={`border rounded-md border-[${note.color}] flex justify-between p-4`}>
        <div>
        <p className="font-semibold text-xl text-start">
        {note.title}
        </p>
        <p>
        {note.description}
        </p>
        </div>
        <div>
        <Button variant="ghost" onClick={() => deleteNote(note.id)}><DeleteBin className="text-lg text-red-600"/></Button>
        </div>
    </section>
  )
}
