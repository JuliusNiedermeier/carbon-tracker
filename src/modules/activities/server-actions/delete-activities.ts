"use server";

import { db } from "@/common/database/client";
import { Activity } from "@/common/database/schema";
import { inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteActivities = async (activityIds: number[]) => {
  "use server";
  await db.delete(Activity).where(inArray(Activity.id, activityIds));
  revalidatePath(`/[company][location]`);
};
