"use server";

import { Activity, ActivityInsert } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { eq } from "drizzle-orm";
import { listActivities } from "./list-activities";

export const updateActivity = async <Column extends keyof ActivityInsert>(ID: number, column: Column, value: ActivityInsert[Column]) => {
  await db
    .update(Activity)
    .set({ [column]: value })
    .where(eq(Activity.id, ID));

  type ListActivitiesResult = Awaited<ReturnType<typeof listActivities>>[number];

  const updatedActivity = await db.query.Activity.findFirst({
    where: eq(Activity.id, ID),
    with: {
      scope: true,
      unit: true,
      factor: { columns: { embedding: false }, with: { unit: true } },
      location: { columns: { name: true }, with: { company: { columns: { id: true, name: true } } } },
    },
  });

  if (!updatedActivity) return null;

  const formattedUpdatedActivity: ListActivitiesResult = {
    ...updatedActivity,
    locationName: updatedActivity.location.name,
    companyId: updatedActivity.location.company.id,
    companyName: updatedActivity.location.company.name,
  };

  return formattedUpdatedActivity;
};
