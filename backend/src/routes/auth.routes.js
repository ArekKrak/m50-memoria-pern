const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const { validateRegister, validateLogin } = require("../middleware/validate");

const router = express.Router();

router.post("/register", validateRegister, async (req, res) => {
  const email = req.body.email.trim();
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); /* Why 10? 10 is the salt rounds value. The higher number, the slower hashing, and therefore a hard time
  for attackers to brute-force */

  try {
    const result = await pool.query(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, hashedPassword]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const email = req.body.email.trim();
  const { password } = req.body;

  try {
    const result = await pool.query(
      `SELECT id, email, password_hash
       FROM users
       WHERE email = $1`,
      [email]
    );
    if (!result.rows.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = user.id;
    
    res.json({
      id: user.id,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  req.logout?.(() => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });
});

router.get("/me", async (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const result = await pool.query(
      `SELECT id, email
       FROM users
       WHERE id = $1`,
      [req.session.userId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;