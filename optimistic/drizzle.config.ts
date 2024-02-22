import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

export default {
  schema: "./app/_database/schema.ts",
  out: "./drizzle",
  driver: "pg",
  introspect: { casing: "preserve" },
  dbCredentials: {
    connectionString: process.env.SUPABASE_POOLED_DB_CONNECTION_STRING!,
  },
} satisfies Config;
