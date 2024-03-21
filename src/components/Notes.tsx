import { INote } from "@/interface/notes_interface";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    note: INote;
  }

export default function Notes({note}: Props) {

  return (    
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
      {note.description}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit</Button>
        <Button>Delete</Button>
      </CardFooter>
    </Card>
  )
}
