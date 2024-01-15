"use server";

import { db } from "@/common/database/client";
import { Company } from "@/common/database/schema";
import { inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteCompanies = async (companyIds: number[]) => {
  await db.delete(Company).where(inArray(Company.id, companyIds));
  revalidatePath("/[company]");
};
