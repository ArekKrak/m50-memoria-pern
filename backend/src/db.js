const { Pool } = require("pg");

const pool = new Pool({
  user: "arek",
  host: "/var/run/postgresql",
  database: "memoria",
  port: 5432
});

module.exports = pool;