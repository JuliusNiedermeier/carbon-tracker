"use server";

import { db } from "@/app/_services/postgres";

export const listEmissionFactorSources = async () => {
  return await db.query.EmissionFactorSource.findMany();
};
