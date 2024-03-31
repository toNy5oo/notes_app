import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { INote } from "@/interface/notes_interface"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddCircleRounded } from "./ui/icones";
import { CirclePicker, ColorResult } from "react-color";


interface Props {
  createNewNote: React.Dispatch<React.SetStateAction<INote>>;
}

export function NoteForm({createNewNote}: Props): JSX.Element {

  const [note, setNote] = useState<INote>({} as INote)


  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"><AddCircleRounded className="mr-2 h-4 w-4" />New Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new note</DialogTitle>
          <DialogDescription>
          Add the details of the note to add.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note_title" className="text-right">
              Title
            </Label>
            <Input
              id="note_title"
              className="col-span-2 h-8"
              onChange={(e) => {
                setNote({...note, title: e.target.value})}} 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note_description" className="text-right">
              Description
            </Label>
            <Textarea
            id="note_description" 
            maxLength={300}
            placeholder="Type here..." 
            className="col-span-2 h-8"
            onChange={(e) => {
              setNote({...note, description: e.target.value})}}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note_color" className="text-right">
              Color
            </Label>
            <CirclePicker 
            colors={[ '#F47373',  '#37D67A', '#2CCCE4', '#dce775', '#ff8a65']}
            circleSize={24}
            onChange={(selectedColor, _) => {
              setNote({...note, color: selectedColor.hex})}}
            />
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
        <Button variant="destructive" onClick={() => createNewNote(note)}>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </>
  )
  
}
