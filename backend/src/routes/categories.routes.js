const express = require("express");
const pool = require("../db");
const requireAuth = require("../middleware/requireAuth");
const { validateCategory } = require("../middleware/validate");

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const userId = req.user ? req.user.id : req.session.userId;

  try {
    const result = await pool.query(
      `SELECT id, name, user_id
       FROM categories
       WHERE user_id = $1
       ORDER BY name`,
      [userId]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", validateCategory, async (req, res) => {
  const name = req.body.name.trim();
  const userId = req.user ? req.user.id : req.session.userId;

  try {
    const result = await pool.query(
      `INSERT INTO categories (name, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [name, userId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;