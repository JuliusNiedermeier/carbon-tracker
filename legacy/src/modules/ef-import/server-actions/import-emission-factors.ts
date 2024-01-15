"use server";

import { importEmissionFactorsFromCSV } from "..";

export const importEmissionFactors = async (data: FormData) => {
  const csv = data.get("csv") as File;
  const csvString = await csv.text();
  return importEmissionFactorsFromCSV(csvString);
};
