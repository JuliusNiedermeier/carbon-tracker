import { EmissionFactorCategory } from "@/common/database/schema";
import { insert } from "../utils/insert";

export const arrayStartsWith = (array: string[], startValues: string[]) => {
  return startValues.every((value, index) => value === array[index]);
};

const getUniqueRowsFromMatrix = (matrix: string[][]) => {
  return matrix.filter((filterRow, index) => {
    const filterString = filterRow.join();
    return index === matrix.findIndex((searchRow) => searchRow.join() === filterString);
  });
};

export const insertCategories = async (
  categoryMatrix: string[][],
  insertedCategoryMatrix: { id: number; name: string }[][] = [],
  depth: number = 0
): Promise<{ id: number; name: string }[][]> => {
  // Deduplicated categories at that depth.
  const uniqueRowsAtDepth = getUniqueRowsFromMatrix(categoryMatrix.map((row) => row.slice(0, depth + 1)));

  // Reduce to categories that have at least the current depth
  const validRowsAtDepth = uniqueRowsAtDepth.filter((row) => row.length > depth);

  // stop recursion if no more valid rows are found
  if (!validRowsAtDepth.length) return insertedCategoryMatrix;

  // Create insertable records
  const categories = validRowsAtDepth.map((validRow): typeof EmissionFactorCategory.$inferInsert => {
    // Find the parent path
    const parentPath = insertedCategoryMatrix.find((potentialParentPath) => {
      const potentialParentPathString = potentialParentPath.map(({ name }) => name).join();
      const validRowString = validRow.slice(0, -1).join();
      return potentialParentPathString === validRowString;
    });

    // Omit parent_id if no parent path was found
    if (!parentPath) return { name: validRow[depth] };

    return { name: validRow[depth], parentEmissionFactorCategoryId: parentPath[depth - 1].id };
  });

  const insertedCategories = await insert(EmissionFactorCategory, categories);

  if (depth === 0) {
    const insertedMatrix = insertedCategories.map((category) => [category]);
    return insertCategories(categoryMatrix, insertedMatrix, depth + 1);
  }

  const matrix = insertedCategoryMatrix
    .map((row) => {
      const children = insertedCategories.filter((category) => category.parentEmissionFactorCategoryId == row[row.length - 1].id);
      if (!children.length) return [row];
      return children.map((child) => [...row, child]);
    })
    .flat(1);

  return insertCategories(categoryMatrix, matrix, depth + 1);
};
