"use server";

import { CompanyLocation } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { eq } from "drizzle-orm";

export const deleteLocation = async (ID: number) => {
  const [deletedLocation] = await db.delete(CompanyLocation).where(eq(CompanyLocation.id, ID)).returning();
  return deletedLocation;
};
