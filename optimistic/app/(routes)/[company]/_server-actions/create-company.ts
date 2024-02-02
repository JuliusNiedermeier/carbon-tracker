"use server";

import { Company } from "@/app/_database/schema";
import { createSlug } from "@/app/_database/utils";
import { db } from "@/app/_services/postgres";

export const createCompany = async (name: string, parentCompanyID: number) => {
  await db.insert(Company).values({
    parentCompanyId: parentCompanyID,
    slug: createSlug(name),
    name: name,
  });
};
