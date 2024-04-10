import { INote } from '@/interface/notes_interface';
import { PinAction } from './PinAction';
import ChangeColorAction from './ChangeColorAction';
import DeleteNoteAction from './DeleteNoteAction';
import { useState } from 'react';

interface NoteActionsProps{
    note: INote,
}

export function NoteActions({ note }: NoteActionsProps) {

  const [showColorPicker, setShowColorPicker] = useState(false);

   return (
    <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 bg-white z-10 flex justify-around p-2 animate-slideAndFadeFromBottom">
      {showColorPicker ? (
        <ChangeColorAction note={note} onToggle={() => setShowColorPicker(false)} showColorPicker={showColorPicker}/>
      ) : (
        <div className="flex justify-around w-full">
          <PinAction note={note} />
          <ChangeColorAction note={note} onToggle={() => setShowColorPicker(true)} showColorPicker={showColorPicker}/>
          <DeleteNoteAction note={note} />
        </div>
       )}
    </div>
  );
}

