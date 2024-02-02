"use server";

import { db } from "@/app/_services/postgres";
import { desc, eq, inArray } from "drizzle-orm";
import { Activity, Company, CorporateGroupView } from "@/app/_database/schema";

export const listActivities = async (rootCompanySlug: string) => {
  const [corporateGroup] = await db.select().from(CorporateGroupView).where(eq(CorporateGroupView.rootCompanySlug, rootCompanySlug));

  const companyIDs = corporateGroup.members?.map((member) => member.id);
  if (!companyIDs) return [];

  const companies = await db.query.Company.findMany({
    where: inArray(Company.id, companyIDs),
    columns: { id: true, name: true },
    with: {
      locations: {
        columns: { id: true, name: true },
        with: {
          activities: { with: { scope: true, unit: true, factor: { columns: { embedding: false }, with: { unit: true } } }, orderBy: desc(Activity.createdAt) },
        },
      },
    },
  });

  return companies
    .map((company) =>
      company.locations
        .map((location) =>
          location.activities.map((activity) => ({ ...activity, locationName: location.name, companyId: company.id, companyName: company.name }))
        )
        .flat()
    )
    .flat();
};
