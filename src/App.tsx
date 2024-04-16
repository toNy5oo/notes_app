// Importing React hooks and components
import { useEffect, useReducer} from "react";
import { useNotes } from "./components/NoteContext";
import { useFetcher } from "./hooks/useFetcher";

// UI and layout components
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";
import { Loading } from "./components/Loading";
import { NoteContent } from "./components/NoteContent";
import { Separator } from "./components/ui/separator";

// Constants and interfaces
import { ROUTES } from "./const/routes";
import { gridContainerStyle, listContainerStyle } from "./const/styles";
import { INote } from "./interface/notes_interface";

// Styles
import "./App.css";
import SectionTitle from "./components/SectionTitle";

function App() {
  // State to toggle between card and list layouts
  const [layout, toggleLayout] = useReducer((state) => (state === "card" ? "list" : "card"), "card");

  // Custom hook to fetch and manage notes
  const { notes, setNotes, filteredNotes, setFilteredNotes } = useNotes();
  const { data, isError, isLoading } = useFetcher(ROUTES.GET_ALL);

  // Effect to organize notes into pinned and others upon data fetch
  useEffect(() => {
    if (data) {
      const updatedNotes = data.reduce((noteObj: { pinned: INote[]; others: INote[] }, data: INote) => {
        if (data.pinned) {
          noteObj.pinned.push(data); 
        } else {
          noteObj.others.push(data); 
        }
        return noteObj;
      }, { pinned: [], others: [] });
  
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
    }
  }, [data, setNotes]);

  // Loading and error states
  if (isLoading) return <Loading />;
  if (isError) return <div>Failed to load</div>;

  // Determine the container class based on the current layout
  const containerClass = layout === "list" ? listContainerStyle : gridContainerStyle;

  return (
    <div className="w-[80%] mx-auto">
      {/* Header Component: Handles layout toggling and note setting */}
      <Header setNotes={setNotes} toggleLayout={toggleLayout} layout={layout} />

      {/* Conditional rendering based on whether notes exist */}
      {(!notes?.pinned.length && !notes?.others.length) ? (
        <p className="text-gray-500 text-xs pt-4">Click to create your first note</p>
      ) : (
        <div className="flex flex-col items-start">
          {/* Pinned Notes Section */}
          {filteredNotes?.pinned.length > 0 && (
            <>
              <SectionTitle text="Pinned" />
              <div className={containerClass}>
                {filteredNotes.pinned.map((note) => <NoteContent key={note.id} note={note} />)}
              </div>
              <Separator className="my-6" />
            </>
          )}

          {/* Other Notes Section */}
          {filteredNotes?.others.length > 0 && (
            <>
          <SectionTitle text="Others" />
          <div className={containerClass}>
            {filteredNotes?.others.map((note) => <NoteContent key={note.id} note={note} />)}
          </div>
          </>
          )}
        </div>

      )}

      {/* Toaster for notifications */}
      <Toaster />
    </div>
  );
}

export default App;
