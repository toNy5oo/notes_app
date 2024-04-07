import "./App.css";
import Header from "./components/Header";
import {  useEffect, useReducer } from "react";
import { ROUTES } from "./const/routes";
import { Toaster } from "./components/ui/toaster";
import { NoteContent } from "./components/NoteContent";
import Loading from "./components/Loading";
import { useNotes } from "./components/NoteContext";
import { useFetcher } from "./hooks/useFetcher";

function App() {

  //SWR hook
  const { data, isError, isLoading } = useFetcher(ROUTES.GET_ALL)
  
  //Layout changing action
  const [layout, toggleLayout] = useReducer(
    (state) => (state === "card" ? "list" : "card"),
    "card",
  );

  //Notes Context
  const { notes, setNotes } = useNotes();

  useEffect(() => {
    if (data) {
      setNotes(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />; 
  }

  if (isError) return <div>Failed to load</div>

  return (
    <>
      <Header
        setNotes={setNotes}
        toggleLayout={toggleLayout}
        layout={layout}
      />
      <div
         className={`flex ${layout === "list" ? "flex-col items-start" : "justify-center"} gap-2 flex-wrap`}
      >
        {
        (notes.length === 0) 
        ? <div className="text-gray-500 text-xs pt-4">Click on the button to create your first note</div>
        : (notes.map((note) => (
          <NoteContent
            key={note.id}
            note={note}
            isCard={layout=='card' ? true : false}
          />
        )))
        }
      </div>
      <Toaster />
    </>
  );
}

export default App;
