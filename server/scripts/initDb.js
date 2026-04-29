import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlDir = path.resolve(__dirname, "../sql");

async function readSql(fileName) {
  return fs.readFile(path.join(sqlDir, fileName), "utf8");
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required.");
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const schemaSql = await readSql("schema.sql");
    const seedSql = await readSql("seed.sql");

    await pool.query(schemaSql);
    await pool.query(seedSql);

    console.log("Aquity World database initialized successfully.");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
