import { INote } from "@/interface/notes_interface";
import { NoteForm } from "./NoteFormDialog";
import { Button } from "./ui/button";
import { CardIcon, ListIcon } from "./ui/icones";
import { Toaster } from "./ui/toaster";
import { useEffect,  useState } from "react";
import { LoadingOverlay } from "./LoadingOverlay";
import { useNotes } from "./NoteContext";
import useSWRMutation from 'swr/mutation'
import { Input } from "./ui/input";
import { CirclePicker } from "react-color";
import { colors } from "@/const/colorpicker_colors";
import { CircleX } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { showNoteCreatedToast } from "@/service/Notifications";
import { ROUTES } from "@/const/routes";
import { useDebounce } from "@/hooks/useDebounce";

interface Props {
  toggleLayout: () => void;
  layout: string;
}

export default function Header({ toggleLayout, layout }: Props) {
  const { trigger: createNoteTrigger, data, isMutating } = useSWRMutation(ROUTES.CREATE, createNote);
  const { setNotes, applyFilter } = useNotes();
  const [colorFilter, setColorFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const debouncedTextFilter = useDebounce(textFilter, 600);

  useEffect(() => {
    if (data) { 
      setNotes(prevNotes => ({ ...prevNotes, others: [...prevNotes.others, data] }));
      showNoteCreatedToast(data.title);
    }
  }, [data, setNotes]);

  useEffect(() => {
    applyFilter({ text: debouncedTextFilter, color: colorFilter });
  }, [debouncedTextFilter, colorFilter]); // Depend on debounced value

  // Search and color filter UI
  const SearchAndColorFilter = () => (
    <div className="flex items-center justify-center gap-2">

      {/* TODO: Input has a bug of showing only the first letter due to rerendering */}
      {/* <Input placeholder="Search by title..." className="md:w-1/2 mx-2" 
        onChange={(e) => setTextFilter(e.target.value)}
        value={textFilter}
      />

      <Separator className="my-4 mr-2" orientation="vertical" />
       */}
       {colorFilter && (
       <>
        <h6 className="text-gray-500 cursor-pointer hover:scale-110 text-xs mr-2" onClick={() => {
          setColorFilter("");
          applyFilter({ text: textFilter, color: "" });
        }}>Clear Filter</h6>
        <Separator className="my-4 mr-2" orientation="vertical" />
        </>
      )}
      <CirclePicker 
        circleSize={14} 
        colors={colors} 
        color={colorFilter} 
        onChange={(color) => {
          setColorFilter(color.hex);
          applyFilter({ text: textFilter, color: color.hex });
        }} 
        className="item-end"
      />
      {/* {colorFilter && (
        <CircleX className="text-red-500 h-4 w-4 mr-1 cursor-pointer hover:scale-110" onClick={() => {
          setColorFilter("");
          applyFilter({ text: textFilter, color: "" });
        }} />
      )} */}
      
    </div>
  );

  // Layout toggle UI
  const LayoutToggle = () => (
    <Button variant="outline" size="icon" onClick={toggleLayout}>
      {layout === "card" ? <ListIcon className="h-4 w-4" /> : <CardIcon className="h-4 w-4" />}
    </Button>
  );

  return (
    <>
      {isMutating && <LoadingOverlay />}
      <div className="flex justify-between mb-4 p-4 border-b-2">
        <NoteForm createNewNote={(newNote) => createNoteTrigger(newNote)} />
        <SearchAndColorFilter />
        <LayoutToggle />
      </div>
      <Toaster />
    </>
  );
}

async function createNote(url: string, { arg }: { arg: INote}) {
  const newId = Math.random().toString();
  arg = { ...arg, id: newId };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json())
}
