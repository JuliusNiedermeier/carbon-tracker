import type { Config } from "drizzle-kit";
import { config as env } from "dotenv";
env({ path: ".env.local" });

export default {
  schema: "./src/common/database/schema/index.ts",
  out: "./drizzle",
  driver: "pg",
  introspect: { casing: "camel" },
  dbCredentials: {
    connectionString: process.env.SUPABASE_POOLED_DB_CONNECTION_STRING!,
  },
} satisfies Config;
