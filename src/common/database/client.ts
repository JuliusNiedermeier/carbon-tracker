import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/common/env";
import * as schema from "./schema";

const client = postgres(env.SUPABASE_POOLED_DB_CONNECTION_STRING);
export const db = drizzle(client, { schema });
