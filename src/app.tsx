import logoNLW from "./assets/Logo-nlw-expert.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import { ChangeEvent, useState } from "react";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      return JSON.parse(notes);
    }
    
    return [];
  });

  const [search, setSearch] = useState("");

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }  

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

  };

  const onNoteDeleted = (id: string) => {
    const notesArray = notes.filter((note) =>{

     return note.id !== id
    });

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  
  }

  const filteredSearch = search !== "" ? notes.filter((note) => note.content.toLocaleLowerCase().includes(search)) : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 md:px-0">
      <img src={logoNLW} alt="logo " />

      <form action="" className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-2xl font-semibold tracking-tight placeholder:text-slate-500 focus:outline-none"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated}/>
        {filteredSearch.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
        ))}
      </div>
    </div>
  );
}
