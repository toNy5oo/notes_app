import { INote } from "@/interface/notes_interface";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

interface DialogProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onAction: () => void;
  onCancel: () => void;
  note: INote;
}

export function NoteDialog({
  isOpen,
  onOpenChange,
  onAction,
  onCancel,
  note,
}: DialogProps) {
  const date = new Date(note.updatedAt);
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex w-max justify-between">
              <div>{note.title}</div>
              <div className={`text-[${note.color}]`}></div>
            </div>
          </AlertDialogTitle>

          <AlertDialogDescription>{note.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <p className="text-[9px] mt-2 opacity-50">Last updated: {date.toLocaleString('en-UK')}</p>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onAction}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
