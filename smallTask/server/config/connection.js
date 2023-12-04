const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Pranes6570",
  port: 5432, // default PostgreSQL port
});

module.exports = client;
