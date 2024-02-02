"use server";

import { Activity, ActivityInsert } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { eq } from "drizzle-orm";
import { listActivities } from "./list-activities";

export const createActivity = async (activityInsert: ActivityInsert) => {
  const [activity] = await db.insert(Activity).values(activityInsert).returning();

  type ListActivitiesResult = Awaited<ReturnType<typeof listActivities>>[number];

  const createdActivity = await db.query.Activity.findFirst({
    where: eq(Activity.id, activity.id),
    with: {
      scope: true,
      unit: true,
      factor: { columns: { embedding: false }, with: { unit: true } },
      location: { columns: { name: true }, with: { company: { columns: { id: true, name: true } } } },
    },
  });

  if (!createdActivity) return null;

  const formattedCreatedActivity: ListActivitiesResult = {
    ...createdActivity,
    locationName: createdActivity.location.name,
    companyId: createdActivity.location.company.id,
    companyName: createdActivity.location.company.name,
  };

  return formattedCreatedActivity;
};
