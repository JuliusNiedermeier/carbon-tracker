"use server";

import { db } from "@/app/_services/postgres";
import { asc, eq } from "drizzle-orm";
import { CompanyLocation, Scope } from "@/app/_database/schema";

export const listLocations = async (companyID: number) => {
  return await db.query.CompanyLocation.findMany({ where: eq(CompanyLocation.companyId, companyID) });
};
