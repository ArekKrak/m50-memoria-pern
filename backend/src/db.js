const { Pool } = require("pg");

const pool = new Pool({
  user: "arek",
  host: "localhost",
  database: "memoria",
  port: 5432
});

module.exports = pool;