import logoNLW from "./assets/Logo-nlw-expert.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logoNLW} alt="logo " />

      <form action="" className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-2xl font-semibold tracking-tight placeholder:text-slate-500 focus:outline-none"
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />
        <NoteCard
          note={{
            date: new Date(),
            content: "Aqui está o conteúdo da nota",
          }}
        />
      </div>
    </div>
  );
}
