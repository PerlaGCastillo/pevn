import { Pool } from "pg"

const pool = new Pool({
  host: "localhost",
  port: "5432",
  user: "prrrrr",
  password: "postgres",
  database: "pevn",
})

module.exports = pool
