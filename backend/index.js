const pool = require("./src/db");
const express = require("express");
const notesRoutes = require("./src/routes/notes.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Memoria API running");
});

pool.query("SELECT NOW()")
  .then((res) => console.log("Database connected:", res.rows[0]))
  .catch((err) => console.error("Database connection error:", err));

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
      `INSERT INTO users (email, password_hash)
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