import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/app/_utils/env";
import * as schema from "@/app/_database/schema";

const client = postgres(env.SUPABASE_POOLED_DB_CONNECTION_STRING);
export const db = drizzle(client, { schema });
