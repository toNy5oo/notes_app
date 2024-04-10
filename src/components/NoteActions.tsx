import { colors } from '@/const/colorpicker_colors';
import { ROUTES } from '@/const/routes';
import { iconProps } from '@/const/styles';
import { INote } from '@/interface/notes_interface';
import {  showNoteDeletedToast } from '@/service/Notifications';
import { LoaderCircle, Palette, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import useSWRMutation from 'swr/mutation';
import { useNotes } from './NoteContext';


interface NoteActionsProps{
    note: INote,
}

async function deleteNote(url: string, { arg }: { arg: string }) {
  return fetch(url+arg, {
    method: 'DELETE',
  }).then(res => res.json())
}

async function changeColor(url: string, { arg }: { arg: INote}) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json())
}

export function NoteActions({ note }: NoteActionsProps) {
  const { setNotes } = useNotes();
  const { trigger: deleteNoteTrigger, data: deleteNoteData, isMutating: isDeleting }= useSWRMutation(ROUTES.DELETE, deleteNote);
  const { trigger: updateNoteTrigger, data: updateNoteData, isMutating: isChangingColor }= useSWRMutation(ROUTES.UPDATE_NOTE, changeColor);

  useEffect(() => {
    if (updateNoteData) {
      setNotes((prev) =>
        prev.map((prevNote) =>
          prevNote.id === updateNoteData.id
            ? updateNoteData
            : prevNote
        )
      );
    }

    if (deleteNoteData) {
      setNotes((prev) => prev.filter((prevNote) => prevNote.id !== deleteNoteData.id))
      showNoteDeletedToast(deleteNoteData)
    }
  }, [updateNoteData, deleteNoteData]);

  const [showColorPicker, toggleColorPicker] = useState(false);

  const handleColorChange = (color: any) => {
    updateNoteTrigger({ ...note, color: color.hex });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 bg-white z-10 flex justify-around p-2 animate-slideAndFadeFromBottom">
      {showColorPicker ? (
        <CirclePicker
          circleSize={18}
          colors={colors.filter((c) => c !== note.color)}
          color={note.color}
          onChangeComplete={handleColorChange}
          onChange={() => {
            toggleColorPicker(!showColorPicker)
            handleColorChange
          }}
        />
      ) : (
        <div className="flex justify-around w-full">
          {isChangingColor ? (
            <LoaderCircle {...iconProps} className="animate-spin" onClick={() => toggleColorPicker(!showColorPicker)} />
          ) : (
            <Palette {...iconProps} onClick={() => toggleColorPicker(!showColorPicker)} />
          )}
          {isDeleting ? (
            <LoaderCircle {...iconProps} className="animate-spin" onClick={() => deleteNoteTrigger(note.id)} />
          ) : (
            <Trash2 {...iconProps} onClick={() => deleteNoteTrigger(note.id)} />
          )}
        </div>
      )}
    </div>
  );
}

