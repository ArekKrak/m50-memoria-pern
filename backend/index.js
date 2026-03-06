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

app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, title, content, user_id, category_id, created_at, updated_at
       FROM notes
       WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    res.json(result.rows[0]);
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

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE notes
       SET title = $1,
           content = $2,
           category_id = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [title, content, category_id ?? null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM notes
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, user_id
       FROM categories
       ORDER BY name`
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/categories", async (req, res) => {
  const { name, user_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO categories (name, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [name, user_id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO categories (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, password]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT id, email
       FROM users
       WHERE email = $1
       AND password_hash = $2`,
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/logout", (req, res) => {
  res.json({ message: "Logged out" });
});

app.get("/me", (req, res) => {
  res.json({ message: "User session placeholder" });
});

app.get("/auth/google", (req, res) => {
  res.json({ message: "Google OAuth start placeholder" });
});

app.get("/auth/google/callback", (req, res) => {
  res.json({ message: "Google OAuth start placeholder" });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});