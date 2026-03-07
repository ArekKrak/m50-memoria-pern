import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard({ user, refreshUser }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    refreshUser();

    fetch("http://localhost:3000/notes", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h1>Your notes</h1>

      <Link to="/notes/new">
        <button>Create note</button>
      </Link>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong>
            {" "}
            <Link to={`/notes/${note.id}/edit`} className="edit">Edit</Link>
            {" "}
            <span className="delete" onClick={() => handleDelete(note.id)}>
              Delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}