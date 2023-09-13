import { object, parse, string } from "valibot";
import "dotenv/config";

const EnvSchema = object({
  NEON_CONNECTION: string(),
  OPENAI_API_KEY: string(),
});

export const env = parse(EnvSchema, process.env);
