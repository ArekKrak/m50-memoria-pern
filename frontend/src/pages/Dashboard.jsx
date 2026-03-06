import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notes", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

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
            <Link to={`/notes/${note.id}/edit`} className="edit">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}