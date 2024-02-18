"use server";

import { Activity, ActivityInsert } from "@/app/_database/schema";
import { db } from "@/app/_services/postgres";
import { eq } from "drizzle-orm";
import { listActivities } from "./list-activities";
import { Input, number, object, safeParse } from "valibot";
import { evaluateFormula } from "../_utils/evaluate-formula";

const co2eEmissionCalculationConfig = {
  dependencies: ["amount", "amountFormula", "unitId", "emissionFactorId"] satisfies (keyof ActivityInsert)[],
  requiredActivityPropertiesSchema: object({ amount: number(), unitID: number(), factorUnitID: number(), co2e: number() }),
};

type RequiredSchemaForEmissionCo2eEmissionCalculation = Record<keyof Input<typeof co2eEmissionCalculationConfig.requiredActivityPropertiesSchema>, any>;
type ListActivitiesResult = Awaited<ReturnType<typeof listActivities>>[number];

export const updateActivity = async <Column extends keyof ActivityInsert>(
  ID: number,
  column: Column,
  value: ActivityInsert[Column]
): Promise<ListActivitiesResult | null> => {
  const update: Partial<ActivityInsert> = { [column]: value };

  if (column === "amountFormula") update.amount = value !== null ? evaluateFormula(value as NonNullable<ActivityInsert["amountFormula"]>) : null;

  await db.update(Activity).set(update).where(eq(Activity.id, ID));

  const updatedActivity = await db.query.Activity.findFirst({
    where: eq(Activity.id, ID),
    with: {
      scope: true,
      unit: true,
      factor: { columns: { embedding: false }, with: { unit: true } },
      location: { columns: { name: true }, with: { company: { columns: { id: true, name: true } } } },
    },
  });

  if (!updatedActivity) return null;

  const formattedUpdatedActivity: ListActivitiesResult = {
    ...updatedActivity,
    locationName: updatedActivity.location.name,
    companyId: updatedActivity.location.company.id,
    companyName: updatedActivity.location.company.name,
  };

  if (!co2eEmissionCalculationConfig.dependencies.includes(column as any)) return formattedUpdatedActivity;

  const { success: hasCo2eEmissionUpdateProperties, output } = safeParse(co2eEmissionCalculationConfig.requiredActivityPropertiesSchema, {
    amount: updatedActivity.amount,
    unitID: updatedActivity.unitId,
    factorUnitID: updatedActivity.factor?.unitId,
    co2e: updatedActivity.factor?.co2e,
  } satisfies RequiredSchemaForEmissionCo2eEmissionCalculation);

  const updatedCo2e = hasCo2eEmissionUpdateProperties && output.unitID === output.factorUnitID ? output.amount * output.co2e : null;

  await db.update(Activity).set({ co2e: updatedCo2e }).where(eq(Activity.id, ID));

  return { ...formattedUpdatedActivity, co2e: updatedCo2e };
};
