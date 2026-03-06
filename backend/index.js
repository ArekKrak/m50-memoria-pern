const pool = require("./src/db");
const express = require("express");
const notesRoutes = require("./src/routes/notes.routes");
const categoriesRoutes = require("./src/routes/categories.routes");
const authRoutes = require("./src/routes/auth.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/notes", notesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Memoria API running");
});

pool.query("SELECT NOW()")
  .then((res) => console.log("Database connected:", res.rows[0]))
  .catch((err) => console.error("Database connection error:", err));

app.get("/auth/google", (req, res) => {
  res.json({ message: "Google OAuth start placeholder" });
});

app.get("/auth/google/callback", (req, res) => {
  res.json({ message: "Google OAuth start placeholder" });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});