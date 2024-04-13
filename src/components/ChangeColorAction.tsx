import { INote } from "@/interface/notes_interface";
import { useNotes } from "./NoteContext";
import { useEffect } from "react";
import { LoaderCircle, Palette } from "lucide-react";
import { iconProps } from "@/const/styles";
import useSWRMutation from "swr/mutation";
import { ROUTES } from "@/const/routes";
import { CirclePicker } from "react-color";
import { colors } from "@/const/colorpicker_colors";

interface Props {
  note: INote
  onToggle: () => void,
  showColorPicker: boolean,
}

export function ChangeColorAction({ note, onToggle, showColorPicker}: Props) {
    const { setNotes } = useNotes();
    const { trigger: updateNoteTrigger, data: updateNoteData, isMutating: isChangingColor }= useSWRMutation(ROUTES.UPDATE_NOTE, changeColor);
   

    useEffect(() => {
      if (updateNoteData) {
        setNotes(prev => ({
          pinned: prev.pinned.map(note => 
            note.id === updateNoteData.id ? updateNoteData : note
          ),
          others: prev.others.map(note => 
            note.id === updateNoteData.id ? updateNoteData : note
          ),
        }));
      }
    }, [updateNoteData, setNotes]);
    

    const handleColorChange = (color: any) => {
      updateNoteTrigger({ ...note, color: color.hex });
    };

  return (
    <>
    {showColorPicker ? (
        <CirclePicker
          className="ml-14"
          circleSize={18}
          colors={colors.filter((c) => c !== note.color)}
          color={note.color}
          onChangeComplete={() => {
            onToggle
          }}
          onChange={handleColorChange}
        />) :    
      isChangingColor ? (
        <LoaderCircle {...iconProps} className="animate-spin" />
      ) : (
        <Palette {...iconProps} onClick={onToggle} />
      )}
      </>
  )
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