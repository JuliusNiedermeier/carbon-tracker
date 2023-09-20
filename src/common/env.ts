import { object, parse, string } from "valibot";
import "dotenv/config";

// The actual environment variables should be located in a .env.local file at the project root.

const EnvSchema = object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string(),
  CLERK_SECRET_KEY: string(),
  SUPABASE_POOLED_DB_CONNECTION_STRING: string(),
  OPENAI_API_KEY: string(),
});

export const env = parse(EnvSchema, process.env);
