import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/common/env";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(env.NEON_CONNECTION);
export const db = drizzle(sql, { schema });
