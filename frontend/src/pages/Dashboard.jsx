import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard({ user, refreshUser }) {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchNotes = () => {
    fetch("http://localhost:3000/notes", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setNotes(data));
  };

  const fetchCategories = () => {
    fetch("http://localhost:3000/categories", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setCategories(data));
  };

  useEffect(() => {
    refreshUser();
    fetchNotes();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ name: categoryName })
    });

    setCategoryName("");
    fetchCategories();
  };

  const filteredNotes = selectedCategory
    ? notes.filter((note) => String(note.category_id) === selectedCategory) : notes;

  return (
    <div>
      <h1>Your notes</h1>

      <form onSubmit={handleCreateCategory}>
        <input
          type="text"
          placeholder="New category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit">Add category</button>
      </form>

      <div>
        <label htmlFor="categoryFilter">Filter by category: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All notes</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <Link to="/notes/new">
        <button>Create note</button>
      </Link>

      <ul>
        {filteredNotes.map((note) => (
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