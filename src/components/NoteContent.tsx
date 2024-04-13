import { useState } from "react";
import { INote } from "@/interface/notes_interface"; // Interfaces
import { NoteDialog } from "./NoteDialog";
import { NoteActions } from "./NoteActions";
import { noteStyle } from "@/const/styles"; // Styles

interface Props {
  note: INote;
}

/**
 * NoteContent displays the content of a note including its title, description, and actions.
 * It supports hovering states and actions like pinning or opening a dialog for more details.
 */
export function NoteContent({ note }: Props) {
  // State to manage hover effect and dialog visibility
  const [isHover, setIsHover] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const date = new Date(note.updatedAt);

  // Handles the opening of the note's detailed view dialog
  const openNoteDialog = () => setIsAlertDialogOpen(true);

  // Closes the note dialog and resets hover state
  const closeNoteDialog = () => {
    setIsAlertDialogOpen(false);
    setIsHover(false);
  };

  return (
    <>
      <div 
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{ borderTop: `10px solid ${note.color}` }}
        className={`${noteStyle} relative`}>
        
        {/* Note's main content that triggers dialog on click */}
        <div onClick={openNoteDialog}>
            <p className="font-semibold text-md">{note.title}</p>
          <p className="text-xs">{note.description}</p>
            <p className="text-[9px] text-right mt-2 opacity-50">Last updated: {date.toLocaleString('en-UK')}</p>
        </div>

        {/* Actions (like editing color or deleting) that appear on hover */}
        {isHover && <NoteActions note={note} />}
      </div>
      
      {/* Dialog for detailed note view and actions */}
      <NoteDialog
        isOpen={isAlertDialogOpen}
        onAction={() => null} // Placeholder for future implementation
        onOpenChange={setIsAlertDialogOpen}
        onCancel={closeNoteDialog}
        note={note}
      />
    </>
  );
}
