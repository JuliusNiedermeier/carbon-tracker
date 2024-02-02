"use server";

import { CorporateGroupView } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { eq } from "drizzle-orm";

export const getCorporateGroup = async (rootCompanySlug: string) => {
  const [corporateGroup] = await db.select().from(CorporateGroupView).where(eq(CorporateGroupView.rootCompanySlug, rootCompanySlug)).limit(1);
  return corporateGroup;
};
