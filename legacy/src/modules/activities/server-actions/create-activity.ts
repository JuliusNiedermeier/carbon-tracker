"use server";

import { db } from "@/common/database/client";
import { Activity } from "@/common/database/schema";
import { revalidatePath } from "next/cache";

export const createActivity = async (locationId: number, description: string) => {
  "use server";
  if (!description) throw new Error("Description cannot be empty");
  await db.insert(Activity).values({ locationId, description });
  revalidatePath(`/[company][location]`);
};
