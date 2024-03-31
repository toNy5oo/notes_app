import { INote } from "@/interface/notes_interface";
import { Button } from "./ui/button";
import {  Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DeleteBin } from "./ui/icones";


interface Props {
    note: INote;
    deleteNote: (id: string) => string;
  }

export default function CardItem({note, deleteNote}: Props) {

  return (
    <Card className={`border-[${note.color}] w-[280px] text-start`}>
      <CardHeader className=" flex flex-row justify-between items-center py-1">
        <CardTitle className="text-xl">{note.title}</CardTitle>
        <Button variant="ghost" onClick={() => deleteNote(note.id)}><DeleteBin className="text-lg text-red-600"/></Button>
      </CardHeader>
      <CardContent>
      {note.description}
      </CardContent>
    </Card>
  )
}
