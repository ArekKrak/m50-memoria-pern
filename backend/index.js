const pool = require("./src/db");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Memoria API running");
});

pool.query("SELECT NOW()")
  .then((res) => console.log("Database connected:", res.rows[0]))
  .catch((err) => console.error("Database connection error:", err));

app.get("/notes", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, title, content, user_id, category_id, created_at, updated_at FROM notes ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/notes", async (req, res) => {
  const { title, content, user_id, category_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO notes (title, content, user_id, category_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, // This tells PostgreSQL: Insert the row, then give it back to me.
      [title, content, user_id, category_id ?? null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});