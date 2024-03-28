import { INote } from "@/interface/notes_interface";
import CardItem from "./CardItem";
import ListItem from "./ListItem";
import '../App.css'


interface Props {
    note: INote;
    deleteNote: (id: number) => void;
    layout: string;
  }

export default function Notes({note, deleteNote, layout}: Props) {

  return ( 

    <div className={layout ? 'grid' : 'list'}>
 
      {
      layout === "card" ? 
      (<CardItem note={note} deleteNote={deleteNote}/>) 
      : 
      (<ListItem note={note} deleteNote={deleteNote}/>)
    }  
     
    </div>
  )
}
