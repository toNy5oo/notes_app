import { INote } from "@/interface/notes_interface";
import { Button } from "./ui/button";
import {  Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    note: INote;
    deleteNote: (id: number) => void;
  }

export default function CardItem({note, deleteNote}: Props) {
  return (
    <Card className="w-[350px] bg-slate-50">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
      {note.description}
      </CardContent>
      <CardFooter className="flex justify-between">
      <Button onClick={() => deleteNote(note.id)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}
