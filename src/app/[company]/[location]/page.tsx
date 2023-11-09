import { CompanySelector } from "@/common/components/company-selector/CompanySelector-new";
import { Container } from "@/common/components/Container";
import { FC } from "react";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { LocationSelector } from "@/common/components/LocationSelector";
import { db } from "@/common/database/client";
import { asc, eq } from "drizzle-orm";
import { Activity, Company, CompanyLocation, EmissionFactor, Scope } from "@/common/database/schema";
import { redirect } from "next/navigation";
import { ActivityTable } from "@/modules/activities/components/table/ActivityTable";

const CompanyPage: FC<{
  params: { company: string; location: string };
}> = async ({ params }) => {
  const company = await db.query.Company.findFirst({
    where: eq(Company.slug, params.company),
    with: {
      locations: {
        with: {
          activities: {
            orderBy: asc(Activity.createdAt),
            with: {
              scope: true,
              unit: true,
              factor: { with: { unit: true } },
            },
          },
        },
        where: eq(CompanyLocation.slug, params.location),
        limit: 1,
      },
    },
  });

  if (!company) return redirect("/");
  if (!company.locations[0]) return redirect(`/${company.slug}`);
  const limit = 99;
  const scopes = await db.query.Scope.findMany({ orderBy: [asc(Scope.scope), asc(Scope.subScope)], limit: limit });
  const units = await db.query.Unit.findMany({ limit: limit });
  const emissionFactorSources = await db.query.EmissionFactorSource.findMany();
  const emissionFactorYears = await db.selectDistinctOn([EmissionFactor.year], { year: EmissionFactor.year }).from(EmissionFactor);

  return (
    <>
      <Container className="mt-4 grid gap-16">
        <div className="flex items-center gap-4">
          <CompanySelector selectedCompanyId={company.id} />
          <CaretRightIcon className="self-center" />
          <LocationSelector selectedCompanyId={company.id} selectedLocationId={company.locations[0].id} />
        </div>

        <ActivityTable
          locationId={company.locations[0].id}
          activities={company.locations[0].activities}
          scopes={scopes}
          units={units}
          emissionFactorSources={emissionFactorSources}
          emissionFactorYears={emissionFactorYears.map(({ year }) => year)}
        />
      </Container>
    </>
  );
};

export default CompanyPage;
