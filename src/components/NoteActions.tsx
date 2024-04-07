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

const iconClasses = "cursor-pointer";

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

export function NoteActions({note}: NoteActionsProps) {

  const {notes, setNotes } = useNotes()

  const {
    trigger: deleteTrigger, data: deleteData, isMutating: isDeleting } = useSWRMutation(ROUTES.DELETE, deleteNote, /* options */)
  const {
    trigger: changeColorTrigger, data: noteUpdated, isMutating: isChangingColor } = useSWRMutation(ROUTES.UPDATE_NOTE, changeColor, /* options */)

  useEffect(() => {
    if (deleteData) {
      const filteredArray = notes.filter((note) => note.id !== deleteData.id);
        setNotes(filteredArray);
        showNoteDeletedToast(deleteData.title);
    }

    if (noteUpdated) {
      setNotes(currentNotes => {
        return currentNotes.map(note => {
          if (note.id === noteUpdated.id) {
            return { ...note, color: noteUpdated.color };
          }
          return note;
        })});
    }
  }, [deleteData, noteUpdated]);

  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className='flex justify-around w-full animate-slideAndFadeFromBottom'>
      
      {isChangingColor 
          ? <LoaderCircle className="animate-spin" {...iconProps}/> 
          : <Palette {...iconProps} className={`${iconClasses}`} onClick={(e) => {
          setShowPicker(!showPicker);
          }}
          />}
          {showPicker && (
           <div className="relative left-5 z-10"> 
           <CirclePicker
           circleSize={18} 
           colors={colors.filter((color) => color !== note.color)} 
           color={note.color} 
           onChangeComplete={(color) => {
            note = {...note, color: color.hex}
            changeColorTrigger(note) 
            }}
         />
         </div>
          )}
          {isDeleting 
          ? <LoaderCircle className="animate-spin" {...iconProps}/> 
          : <Trash2 {...iconProps} className={`${iconClasses} hover:text-red-600`}  onClick={(e) => {
                    deleteTrigger(note.id)
                  }}
                  />}
  </div>
  )
}
