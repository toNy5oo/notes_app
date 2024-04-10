import "./App.css";
import Header from "./components/Header";
import { useEffect, useReducer } from "react";
import { ROUTES } from "./const/routes";
import { Toaster } from "./components/ui/toaster";
import { NoteContent } from "./components/NoteContent";
import Loading from "./components/Loading";
import { useNotes } from "./components/NoteContext";
import { useFetcher } from "./hooks/useFetcher";
import { gridContainerStyle, listContainerStyle } from "./const/styles";

function App() {
  const [layout, toggleLayout] = useReducer(
    (state) => (state === "card" ? "list" : "card"),
    "card",
  );

  const { notes, setNotes } = useNotes();
  const { data, isError, isLoading } = useFetcher(ROUTES.GET_ALL);

  useEffect(() => {
    if (data) setNotes(data);
  }, [data, setNotes]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Failed to load</div>;

  const containerClass = `${layout === "list" ? listContainerStyle : gridContainerStyle}`;

  return (
    <div className="w-[80%] mx-auto">
      <Header setNotes={setNotes} toggleLayout={toggleLayout} layout={layout} />
      {notes.length === 0 ? (
        <p className="text-gray-500 text-xs pt-4">Click to create your first note</p>
      ) : (
        <div className={containerClass}>
          {notes.map((note) => (
            <NoteContent key={note.id} note={note} />
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}


export default App;
