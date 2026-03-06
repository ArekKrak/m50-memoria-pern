import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder behaviour
    console.log({ title, content });
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