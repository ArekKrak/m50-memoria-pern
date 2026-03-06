const pool = require("./db");
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});