"use server";

import { db } from "@/app/_services/postgres";
import { asc } from "drizzle-orm";
import { Scope } from "@/app/_database/schema";

export const listScopes = async () => {
  return await db.query.Scope.findMany({ orderBy: [asc(Scope.scope), asc(Scope.subScope)] });
};
