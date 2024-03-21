import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { INote } from "@/interface/notes_interface"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface Props {
  createNewNote: React.Dispatch<React.SetStateAction<INote>>;
}

export function NoteForm({createNewNote}: Props): JSX.Element {
  const [note, setNote] = useState<INote>({} as INote)

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="destructive">New note</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Create new Note</h4>
            <p className="text-sm text-muted-foreground">
              Add the details of the note to add
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="note_title">Title</Label>
              <Input
                id="note_title"
                className="col-span-2 h-8"
                onChange={(e) => {
                  setNote({...note, title: e.target.value})}} 
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="note_description">Description</Label>
              <Textarea
              id="note_description" 
              maxLength={300}
              placeholder="Type here..." 
              className="col-span-2 h-8"
              onChange={(e) => {
                setNote({...note, description: e.target.value})}}/>
            </div>
          </div>
          <Button variant="destructive" onClick={() => createNewNote(note)}>Create</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
