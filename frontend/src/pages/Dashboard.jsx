import { Link } from "react-router-dom";

export default function Dashboard() {
  // Placeholder notes
  const notes = [
    { id: 1, title: "First note", category: "General" },
    { id: 2, title: "React thoughts", category: "Programming" },
    { id: 3, title: "Travels to go", category: "Travelling" }
  ];

  return (
    <div>
      <h1>Your notes</h1>

      <Link to="/notes/new">
        <button>Create note</button>
      </Link>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong> ({note.category})
            {" "}
            <Link to={`/notes/${note.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}