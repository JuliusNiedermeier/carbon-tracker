"use server";

import { Activity } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { inArray } from "drizzle-orm";

export const deleteActivities = async (activityIds: number[]) => {
  "use server";
  await db.delete(Activity).where(inArray(Activity.id, activityIds));
};
