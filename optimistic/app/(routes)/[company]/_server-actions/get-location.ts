"use server";

import { CompanyLocation } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { eq } from "drizzle-orm";

export const getLocation = async (locationID: number) => {
  return await db.query.CompanyLocation.findFirst({ where: eq(CompanyLocation.id, locationID) });
};
