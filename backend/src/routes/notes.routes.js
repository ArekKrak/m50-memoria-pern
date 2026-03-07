const express = require("express");
const pool = require("../db");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const userId = req.user ? req.user.id : req.session.userId;

  try {
    const result = await pool.query(
      `SELECT id, title, content, user_id, category_id, created_at, updated_at
       FROM notes
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user ? req.user.id : req.session.userId;

  try {
    const result = await pool.query(
      `SELECT id, title, content, user_id, category_id, created_at, updated_at
       FROM notes
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
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
  const { title, content, category_id } = req.body;
  const userId = req.user ? req.user.id : req.session.userId;

  try {
    const result = await pool.query(
      `INSERT INTO notes (title, content, user_id, category_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, // This tells PostgreSQL: Insert the row, then give it back to me.
      [title, content, userId, category_id ?? null]
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
  const userId = req.user ? req.user.id : req.session.userId;

  try {
    const result = await pool.query(
      `UPDATE notes
       SET title = $1,
           content = $2,
           category_id = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [title, content, category_id ?? null, id, userId]
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
  const userId = req.user ? req.user.id : req.session.userId;

  try {
    const result = await pool.query(
      `DELETE FROM notes
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, userId]
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