import "./App.css";
import Header from "./components/Header";
import { useEffect, useReducer, useState } from "react";
import { INote } from "./interface/notes_interface";
import { ROUTES } from "./const/routes";
import { DELETE_RESPONSE, TOGGLE_RESPONSE } from "./const/enums";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import { NoteContent } from "./components/NoteContent";
import Loading from "./components/Loading";

const cardClasses = `pb-3 pt-2 p-3 rounded-md flex-wrap gap-4`
const listClasses = `flex-col rounded-md justify-between gap-2`

function App() {
  const [layout, toggleLayout] = useReducer(
    (state) => (state === "card" ? "list" : "card"),
    "card",
  );

  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  function showToast(noteTitle: string, noteMessage: string) {
    toast({
      title: noteTitle,
      description: noteMessage,
    });
  }

  async function deleteNoteResponse(id: string): Promise<string> {
    const response = await fetch(ROUTES.DELETE + id, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
    return result;
  }

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        // Fetch data from your API
        const response = await fetch(ROUTES.GET_ALL);
        const notes = await response.json();
        setNotes(notes);
        setLoading(false); // Set loading to false upon successful fetch
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  async function deleteNote(id: string): Promise<void> {
    const result = await deleteNoteResponse(id);
    if (result == DELETE_RESPONSE.DELETED) {
      {
        const filteredArray = notes.filter((note) => note.id !== id);
        setNotes(filteredArray);
        showToast("Success", "The note was deleted successfully.");
      }
    } else
      showToast("Error deleting note", "There was a problem deleting the note");
  }
  
  async function togglePin(id: string): Promise<void> {
    const result = await deleteNoteResponse(id);
    if (result == TOGGLE_RESPONSE.PINNED || TOGGLE_RESPONSE.UNPINNED) {
      {
        
        showToast("Success", "The note was deleted successfully.");
      }
    } else
      showToast("Error", "There was a problem with the action.");
  }

  if (loading) {
    return <Loading />; 
  }

  return (
    <>
      <Header
        notes={notes}
        setNotes={setNotes}
        toggleLayout={toggleLayout}
        layout={layout}
      />
      
      <div
        // className={`flex justify-around items-center ${layout === "list" ? listClasses : cardClasses}`} 
        className={`flex justify-evenly gap-2 ${layout === "list" ? "flex-col" : ""}`}
      >
        {notes.map((note) => (
          <NoteContent
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            togglePin={togglePin}
            isCard={layout=='card' ? true : false}
          />
        ))}
      </div>
      <Toaster />
    </>
  );
}

export default App;
