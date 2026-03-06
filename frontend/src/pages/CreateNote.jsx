import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNote({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        content,
        user_id: user.id
      })
    });
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Create Note</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        />

        <button type="submit">Save note</button>
      </form>
    </div>
  );
}