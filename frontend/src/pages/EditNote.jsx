import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams(); // Extracts the `:id` from the route `/notes/:id/edit` That's the identifier that tells the editor which note is being modified
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/notes/${id}`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        content
      })
    });

    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Edit Note #{id}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        />

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}