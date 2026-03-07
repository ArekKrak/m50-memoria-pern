function validateIdParam(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  next();
}

function validateCategory(req, res, next) {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Invalid category name" })
  }

  next();
}

function validateNote(req, res, next) {
  const { title, content, category_id } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Invalid note title" });
  }

  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Invalid note content" });
  }

  if (
    category_id !== undefined &&
    category_id !== null &&
    category_id !== "" &&
    (!Number.isInteger(Number(category_id)) || Number(category_id) < 1)
  ) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  next();
}

function validateRegister(req, res, next) {
  const { email, password } = req.body;

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  next();
} 

module.exports = { validateIdParam, validateCategory, validateNote, validateRegister };