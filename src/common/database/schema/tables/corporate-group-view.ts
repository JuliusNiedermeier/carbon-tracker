import { isNull, sql } from "drizzle-orm";
import { Company } from "./company";
import { integer, json, pgView } from "drizzle-orm/pg-core";

const corporateGroupViewSQL = sql`
WITH RECURSIVE corporate_group AS (
    SELECT ${Company.id} AS root_company_id, ${Company.id}, ${Company.parentCompanyId}, ${Company.slug}, ${Company.name}, ARRAY[id] AS members
    FROM ${Company}
    WHERE ${isNull(Company.parentCompanyId)}
    
    UNION ALL
    
    SELECT corporate_group.root_company_id, ${Company.id}, ${Company.parentCompanyId}, ${Company.slug}, ${Company.name}, corporate_group.members || ${
  Company.id
}
    FROM ${Company}
    JOIN corporate_group ON ${Company.parentCompanyId} = corporate_group.id
)

SELECT corporate_group.root_company_id, json_agg(json_build_object('id', id, 'parentCompanyId', parent_company_id, 'slug', slug, 'name', name)) AS members
FROM corporate_group
GROUP BY corporate_group.root_company_id
ORDER BY corporate_group.root_company_id
`;

export interface CorporateGroupViewMember {
  id: number;
  parentCompanyId: number;
  slug: string;
  name: string;
}

export const CorporateGroupView = pgView("corporate_group_view", {
  rootCompanyId: integer("root_company_id"),
  members: json("members").$type<CorporateGroupViewMember[]>(),
}).as(corporateGroupViewSQL);
