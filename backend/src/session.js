const session = require("express-session");

module.exports = session({
  secret: "memoria-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
});