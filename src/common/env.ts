import { object, parse, string } from "valibot";
import "dotenv/config";

const EnvSchema = object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string(),
  CLERK_SECRET_KEY: string(),
  NEON_CONNECTION: string(),
  SUPABASE_POOLED_DB_CONNECTION_STRING: string(),
  OPENAI_API_KEY: string(),
});

export const env = parse(EnvSchema, process.env);
