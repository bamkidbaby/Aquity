import pg from "pg";
import { hasDatabase, config } from "./config.js";

const { Pool } = pg;

export const pool = hasDatabase
  ? new Pool({
      connectionString: config.databaseUrl,
    })
  : null;
