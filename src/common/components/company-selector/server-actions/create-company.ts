"use server";

import { db } from "@/common/database/client";
import { Company } from "@/common/database/schema";
import { createSlug } from "@/common/database/schema/utils";
import { revalidatePath } from "next/cache";
import { minLength, number, object, parse, string } from "valibot";

export const createCompany = async (formData: FormData) => {
  const formDataSchema = object({ name: string([minLength(3)]), parentCompanyId: number() });
  const validData = parse(formDataSchema, Object.fromEntries(formData.entries()));

  if (!validData.name || !validData.parentCompanyId || isNaN(validData.parentCompanyId)) return;

  await db.insert(Company).values({
    parentCompanyId: validData.parentCompanyId,
    slug: createSlug(validData.name),
    name: validData.name,
  });

  revalidatePath("/[company]");
};
