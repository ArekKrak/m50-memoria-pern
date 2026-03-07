function validateIdParam(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  next();
}

module.exports = { validateIdParam };