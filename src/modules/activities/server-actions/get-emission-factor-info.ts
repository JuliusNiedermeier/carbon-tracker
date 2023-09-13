"use server";

import { db } from "@/common/database/client";
import { getEmissionFactorCategoryPath } from "../utils/get-emission-factor-category-path";
import { EmissionFactor } from "@/common/database/schema";
import { eq } from "drizzle-orm";

export const getEmissionFactorInfo = async (emissionFactorId: number, emissionFactorCategoryId: number) => {
  const [categoryPath] = await getEmissionFactorCategoryPath([emissionFactorCategoryId]);

  const emissionFactor = await db.query.EmissionFactor.findFirst({
    where: eq(EmissionFactor.id, emissionFactorId),
    columns: { year: true },
    with: { emissionFactorSource: { columns: { name: true } }, unit: { columns: { abbreviation: true, name: true } } },
  });

  const data = {
    categories: categoryPath?.nodes.map(({ name }) => name) || [],
    unit: emissionFactor?.unit,
    source: emissionFactor?.emissionFactorSource.name,
    year: emissionFactor?.year,
  };

  console.log(data);

  return data;
};
