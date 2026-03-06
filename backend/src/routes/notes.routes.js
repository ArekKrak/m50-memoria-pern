const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, content, user_id, category_id, created_at, updated_at
       FROM notes
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, title, content, user_id, category_id, created_at, updated_at
       FROM notes
       WHERE id = $1`,
      [id]
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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
    if (!result.rows.length) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM notes
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;