import './App.css'
import Header from './components/Header'
import Notes from './components/Notes'
import { useState } from 'react'
import { notes_array } from './const/notes_array'
import { INote } from './interface/notes_interface'


function App() {
  const [notes , setNotes] = useState<INote[]>(notes_array)

  //Fetch Notes from DB in state, display them in 3 col cards

  return (
    <>
      <Header notes={notes} setNotes={setNotes} />
      <div className='flex gap-4 flex-wrap justify-evenly'>
      {
        notes.map(note => (
          <Notes key={note.id} note={note} />
        ))
      }
      </div>
    </>
  )
}

export default App
