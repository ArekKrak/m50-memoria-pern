module.exports = function requireAuth(req, res, next) {
  if (req.user) {
    return next();
  }

  if (req.session && req.session.userId) {
    return next();
  }

  return res.status(401).json({ error: "Not authenticated" });
};