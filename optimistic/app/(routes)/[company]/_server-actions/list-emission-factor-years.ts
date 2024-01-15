"use server";

import { db } from "@/app/_services/postgres";
import { EmissionFactor } from "@/app/_database/schema";

export const listEmissionFactorYears = async () => {
  return await db.selectDistinctOn([EmissionFactor.year], { year: EmissionFactor.year }).from(EmissionFactor);
};
