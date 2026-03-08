require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sessionMiddleware = require("./src/session");
const passport = require("./src/auth/google");
const notesRoutes = require("./src/routes/notes.routes");
const categoriesRoutes = require("./src/routes/categories.routes");
const authRoutes = require("./src/routes/auth.routes");

const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
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

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback", 
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

module.exports = app;