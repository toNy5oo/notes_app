import {  toast } from "@/components/ui/use-toast";

export function showNoteCreatedToast(noteTitle: string) {
    toast({
      title: "Created",
      description: "Your new note '" + noteTitle + "' has been added.",
    });
  }

  export function showNoteDeletedToast(noteTitle: string) {
    toast({
      title: "Deleted",
      description: "The note '" + noteTitle + "' has been successfully deleted.",
    });
  }

  export function showErrorToast(error: string) {
    toast({
      title: "Error",
      description: error,
    });
  }