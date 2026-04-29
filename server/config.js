import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional(),
  JWT_SECRET: z.string().min(12).default("dev-secret-change-me"),
  DATABASE_URL: z.string().optional().default(""),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  NODE_ENV: z.string().optional().default("development"),
});

const env = envSchema.parse(process.env);

export const config = {
  port: Number(env.PORT ?? 4000),
  jwtSecret: env.JWT_SECRET,
  databaseUrl: env.DATABASE_URL,
  corsOrigin: env.CORS_ORIGIN,
  nodeEnv: env.NODE_ENV,
};

export const hasDatabase = Boolean(config.databaseUrl);
