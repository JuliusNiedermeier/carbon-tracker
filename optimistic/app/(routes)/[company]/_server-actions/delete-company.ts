"use server";

import { Company } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { eq } from "drizzle-orm";

export const deleteCompany = async (ID: number) => await db.delete(Company).where(eq(Company.id, ID));
