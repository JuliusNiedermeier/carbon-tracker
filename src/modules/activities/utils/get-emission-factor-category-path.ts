"use server";

import { db } from "@/common/database/client";
import { EmissionFactorCategory } from "@/common/database/schema";
import { inArray, sql } from "drizzle-orm";

const createEmissionFactorCategoryPathSQL = (leafEmissionFactorCategoryIds: number[]) =>
  sql`
WITH RECURSIVE category_path AS (
  SELECT ${EmissionFactorCategory.id}, ${EmissionFactorCategory.id} as leaf_id, ${EmissionFactorCategory.parentEmissionFactorCategoryId},  ${
    EmissionFactorCategory.name
  }, ARRAY[${EmissionFactorCategory.id}] AS path_ids
  FROM ${EmissionFactorCategory}
  WHERE ${inArray(EmissionFactorCategory.id, leafEmissionFactorCategoryIds)}

  UNION ALL

  SELECT  ${EmissionFactorCategory.id}, category_path.leaf_id, ${EmissionFactorCategory.parentEmissionFactorCategoryId}, ${
    EmissionFactorCategory.name
  }, category_path.path_ids || ${EmissionFactorCategory.id}
  FROM ${EmissionFactorCategory}
  JOIN category_path ON ${EmissionFactorCategory.id} = category_path.parent_emission_factor_category_id
)

SELECT category_path.leaf_id, json_agg(json_build_object('id', category_path.id, 'name', category_path.name)) AS nodes
FROM category_path
GROUP BY category_path.leaf_id
ORDER BY category_path.leaf_id;
`.mapWith((value) => {
    console.log("Driver value", value);
    return value as { leaf_id: number; nodes: { id: number; name: string }[] };
  });

export const getEmissionFactorCategoryPath = async (leafEmissionFactorCategoryIds: number[]) => {
  if (!leafEmissionFactorCategoryIds.length) return [];
  const results = await db.execute(createEmissionFactorCategoryPathSQL(leafEmissionFactorCategoryIds));
  return results.rows as { leaf_id: number; nodes: { id: number; name: string }[] }[];
};
