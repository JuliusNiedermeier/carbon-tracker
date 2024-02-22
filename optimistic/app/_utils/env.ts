import { object, parse, string } from "valibot";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

// The actual environment variables should be located in a .env.local file at the project root.

const EnvSchema = object({
  SUPABASE_POOLED_DB_CONNECTION_STRING: string(),
  OPENAI_SECRET_KEY: string(),
});

export const env = parse(EnvSchema, process.env);
