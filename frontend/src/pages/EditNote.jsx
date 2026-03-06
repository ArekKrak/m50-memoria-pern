import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams(); // Extracts the `:id` from the route `/notes/:id/edit` That's the identifier that tells the editor which note is being modified
  const navigate = useNavigate();

  // Placeholder data
  const [title, setTitle] = useState("Sample note title");
  const [content, setContent] = useState("Sample note content...");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({ id, title, content });
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