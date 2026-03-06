const pool = require("./src/db");
const express = require("express");
const sessionMiddleware = require("./src/session");
require("dotenv").config();
const passport = require("./src/auth/google");
const notesRoutes = require("./src/routes/notes.routes");
const categoriesRoutes = require("./src/routes/categories.routes");
const authRoutes = require("./src/routes/auth.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use("/notes", notesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Memoria API running");
});

pool.query("SELECT NOW()")
  .then((res) => console.log("Database connected:", res.rows[0]))
  .catch((err) => console.error("Database connection error:", err));

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback", 
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login"
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});