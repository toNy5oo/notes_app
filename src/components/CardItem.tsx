import { INote } from "@/interface/notes_interface";
import { Button } from "./ui/button";
import {  Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { DeleteBin } from "./ui/icones";


interface Props {
    note: INote;
    deleteNote: (string: number) => void;
  }

export default function CardItem({note, deleteNote}: Props) {

  return (
    <Card className="w-[280px] bg-slate-50 text-start">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl">{note.title}</CardTitle>
        <Button variant="ghost" onClick={() => deleteNote(note.id)}><DeleteBin className="text-lg text-red-600"/></Button>
      </CardHeader>
      <CardContent>
      {note.description}
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  )
}
