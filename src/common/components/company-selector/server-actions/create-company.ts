"use server";

import { db } from "@/common/database/client";
import { Company } from "@/common/database/schema";
import { createSlug } from "@/common/database/schema/utils";
import { revalidatePath } from "next/cache";

export const createCompany = async (data: FormData) => {
  const name = data.get("name") as string;
  const parentCompanyId = parseInt(data.get("parentCompanyId") as string);

  if (!name || !parentCompanyId || isNaN(parentCompanyId)) return;
  await db.insert(Company).values({
    parentCompanyId,
    slug: createSlug(name),
    name,
  });

  revalidatePath("/");
};
