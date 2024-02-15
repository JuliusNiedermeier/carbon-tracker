"use server";

import { db } from "@/app/_services/postgres";
import { getEmissionFactorCategoryPaths } from "./get-emission-factor-category-path";
import { EmissionFactor } from "@/app/_database/schema";
import { eq } from "drizzle-orm";

export const getEmissionFactorInfo = async (emissionFactorId: number) => {
  const emissionFactor = await db.query.EmissionFactor.findFirst({
    where: eq(EmissionFactor.id, emissionFactorId),
    columns: { year: true, emissionFactorCategoryId: true, co2e: true },
    with: { emissionFactorSource: true, unit: true },
  });

  if (!emissionFactor) return null;

  const [categoryPath] = await getEmissionFactorCategoryPaths([emissionFactor.emissionFactorCategoryId]);

  return {
    categories: categoryPath?.nodes.map(({ name }) => name) || [],
    unit: emissionFactor?.unit,
    source: emissionFactor?.emissionFactorSource,
    year: emissionFactor?.year,
    co2e: emissionFactor?.co2e,
  };
};
