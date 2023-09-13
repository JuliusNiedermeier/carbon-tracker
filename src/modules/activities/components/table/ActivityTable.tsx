import { FC, Suspense } from "react";
import { db } from "@/common/database/client";
import { Activity, EmissionFactor } from "@/common/database/schema";
import { desc, eq } from "drizzle-orm";
import { ClientActivityTable } from "./ClientActivityTable";

interface Props {
  locationId: number;
}

export type JoinedActivity = Awaited<ReturnType<typeof getActivities>>[number];

const getActivities = (locationId: number) => {
  return db.query.Activity.findMany({
    where: eq(Activity.locationId, locationId),
    with: { scope: true, unit: true, factor: { with: { unit: true } } },
    orderBy: [desc(Activity.createdAt)],
  });
};

export const ActivityTable: FC<Props> = async ({ locationId }) => {
  const activities = await getActivities(locationId);

  const scopes = await db.query.Scope.findMany();
  const units = await db.query.Unit.findMany();
  const emissionFactorSources = await db.query.EmissionFactorSource.findMany();
  const emissionFactorYears = await db.selectDistinctOn([EmissionFactor.year], { year: EmissionFactor.year }).from(EmissionFactor);

  return (
    <Suspense fallback="Loading...">
      <ClientActivityTable
        locationId={locationId}
        activities={activities}
        scopes={scopes}
        units={units}
        emissionFactorSources={emissionFactorSources}
        emissionFactorYears={emissionFactorYears.map(({ year }) => year)}
      />
    </Suspense>
  );
};
