import { createEmbeddings } from "./embeddings";
import { insertCategories } from "./inserts/categories";
import { insertFactors } from "./inserts/factors";
import { insertSources } from "./inserts/sources";
import { insertUnits } from "./inserts/units";
import { parseCSV } from "./utils/csv-parser";

export type ParsedCSV = ReturnType<typeof parseCSVWithConfig>;

const CATEGORY_DELIMITER = ",";

const parseCSVWithConfig = (csv: string) => {
  return parseCSV({
    csv,
    delimiter: ",",
    join: CATEGORY_DELIMITER,
    properties: {
      source: 0,
      year: 1,
      categories: [2, -12],
      unit: -12,
      co2e: -11,
      co2: -10,
      ch4: -9,
      n2o: -8,
      hfc: -7,
      pfc: -6,
      sf6: -5,
      nf3: -4,
      voc: -3,
      notes: -2,
      uncertainty: -1,
    },
  });
};

export const importEmissionFactorsFromCSV = async (csv: string) => {
  const parsedCSV = parseCSVWithConfig(csv);

  const [units, sources, categoryMatrix] = await Promise.all([
    insertUnits(parsedCSV),
    insertSources(parsedCSV),
    insertCategories(parsedCSV.map((line) => line.categories.split(CATEGORY_DELIMITER))),
  ]);

  console.log("Units, sources and categories successfully imported.");

  const embeddings = await createEmbeddings(categoryMatrix.map((categories) => categories.map(({ name }) => name)));

  const factors = await insertFactors(parsedCSV, sources, units, categoryMatrix, embeddings, CATEGORY_DELIMITER);

  return { units: units.length, sources: sources.length, categories: categoryMatrix.length, factors: factors.length };
};
