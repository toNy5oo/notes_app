import './App.css'
import Header from './components/Header'
import Note from './components/Note'
import { useReducer, useState } from 'react'
import { notes_array } from './const/notes_array'
import { INote } from './interface/notes_interface'

function App() {

  const [layout, toggleLayout] = useReducer((state) => state === 'card' ? 'list' : 'card', 'card');
  
  const [notes, setNotes] = useState<INote[]>(notes_array);
  
  function deleteNote(id: number): void {
    const filteredArray = notes.filter((note) => (note.id!== id));
    setNotes(filteredArray);
  }
  
  return (
    <>
      <Header notes={notes} setNotes={setNotes} toggleLayout={toggleLayout} layout={layout}/>
      <div className={`flex gap-4 flex-wrap justify-evenly ${layout === "list" && "flex-col" }`}>
        {
          notes.map(note => (
            <Note key={note.id} note={note} deleteNote={deleteNote} layout={layout}/>
          ))
        }
      </div>
    </>
  )
}

export default App
