"use server";

import { db } from "@/app/_services/postgres";

export const listUnits = async () => {
  return await db.query.Unit.findMany();
};
