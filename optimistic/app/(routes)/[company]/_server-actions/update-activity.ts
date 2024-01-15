"use server";

import { Activity, ActivityInsert } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { eq } from "drizzle-orm";

export const updateActivity = async <Column extends keyof ActivityInsert>(ID: number, column: Column, value: ActivityInsert[Column]) => {
  await db
    .update(Activity)
    .set({ [column]: value })
    .where(eq(Activity.id, ID));
};
