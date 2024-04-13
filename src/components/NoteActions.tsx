import { INote } from '@/interface/notes_interface';
import { PinAction } from './PinAction';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { ChangeColorAction } from './ChangeColorAction';
import { DeleteNoteAction } from './DeleteNoteAction';

interface NoteActionsProps{
    note: INote,
}

export function NoteActions({ note }: NoteActionsProps) {

  const [showColorPicker, setShowColorPicker] = useState(false);

   return (
    <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 bg-gray-500 z-10 flex justify-around p-2 animate-slideAndFadeFromBottom">
      {showColorPicker ? (
        <ChangeColorAction note={note} onToggle={() => setShowColorPicker(false)} showColorPicker={showColorPicker}/>
      ) : (
        <div className="flex justify-evenly w-full">
          <PinAction note={note} />
              <Separator orientation='vertical' />
          <ChangeColorAction note={note} onToggle={() => setShowColorPicker(!showColorPicker)} showColorPicker={showColorPicker}/>
              <Separator orientation='vertical' />
          <DeleteNoteAction note={note} />
        </div>
       )}
    </div>
  );
}

