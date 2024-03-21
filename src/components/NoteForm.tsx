import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

export function NoteForm() {
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
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="note_description">Description</Label>
              <Textarea
              id="note_description" 
              maxLength={300}
              placeholder="Type here..." 
              className="col-span-2 h-8"/>
            </div>
          </div>
          <Button variant="destructive">Create</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
