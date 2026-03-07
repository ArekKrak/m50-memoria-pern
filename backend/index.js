require("dotenv").config();
const pool = require("./src/db");
const app = require("./app");
const PORT = process.env.PORT || 3000;

pool.query("SELECT NOW()")
  .then((res) => console.log("Database connected:", res.rows[0]))
  .catch((err) => console.error("Database connection error:", err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});