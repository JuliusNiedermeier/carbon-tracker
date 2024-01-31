"use server";

import { Activity } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteActivities = async (activityIds: number[]) => {
  "use server";
  await db.delete(Activity).where(inArray(Activity.id, activityIds));
  revalidatePath(`/[company][location]`);
};
