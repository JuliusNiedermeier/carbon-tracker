"use server";

import { CompanyLocation } from "@/app/_database/schema";
import { createSlug } from "@/app/_database/utils";
import { db } from "@/app/_services/postgres";

export const createCompanyLocation = async (companyID: number, name: string) => {
  await db.insert(CompanyLocation).values({
    companyId: companyID,
    name,
    slug: createSlug(name),
  });
};
