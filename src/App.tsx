import './App.css'
import Header from './components/Header'
import Note from './components/Note'
import { Suspense, useEffect, useReducer, useState } from 'react'
import { INote } from './interface/notes_interface'
import { ROUTES } from './const/routes'
import { DELETE_RESPONSE } from './const/enums'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "./components/ui/toaster";

function App() {

  const [layout, toggleLayout] = useReducer((state) => state === 'card' ? 'list' : 'card', 'card');
  
  const [notes, setNotes] = useState<INote[]>([]);

  const { toast } = useToast()

  function showToast(noteTitle: string, noteMessage: string) {
    toast({
      title: noteTitle,
      description: noteMessage,
    })
  }
  
  async function fetchNotes() {
    const response = await fetch(ROUTES.GET_ALL);
    const notes = await response.json();
    console.log(notes);
    setNotes(notes);
  }

  async function deleteNoteResult(id: string): Promise<string>{
    const response = await fetch(ROUTES.DELETE + id,{
      method: 'DELETE',
    });
    const result = await response.json();
    console.log(result);
    return result;
  }
  
useEffect(() => {
  fetchNotes();
}, [])

  async function deleteNote(id: string): Promise<void> {
    const result = await deleteNoteResult(id);
    if (result == DELETE_RESPONSE.DELETED) {
    {
      const filteredArray = notes.filter((note) => (note.id!== id));
      setNotes(filteredArray);
      showToast("Success", "The note was deleted successfully.");
    }}
    else showToast("Error deleting note", "There was a problem deleting the note");
  }
  
  return (
    <>
    <Suspense fallback={<Loading />}>

      <Header notes={notes} setNotes={setNotes} toggleLayout={toggleLayout} layout={layout}/>
      <div className={`flex gap-4 flex-wrap justify-evenly ${layout === "list" && "flex-col" }`}>
        {
          notes.map(note => (
            <Note key={note.id} note={note} deleteNote={deleteNote} layout={layout}/>
            ))
          }
      </div>
      <Toaster />
    </Suspense>
    </>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
export default App
