const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
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

module.exports = router;