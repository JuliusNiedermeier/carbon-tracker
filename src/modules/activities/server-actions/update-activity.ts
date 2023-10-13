"use server";

import { db } from "@/common/database/client";
import { Activity, ActivityInsert, ActivityInsertSchema, EmissionFactor } from "@/common/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { parse, partial, strict } from "valibot";
import { evaluateAmountFormula } from "../utils/evaluate-amount-formula";

export const getEmissionFactor = async (emissionFactorId: number) => {
  const emissionFactor = await db.query.EmissionFactor.findFirst({ where: eq(EmissionFactor.id, emissionFactorId) });
  return emissionFactor;
};

export const updateActvity = async (activityId: number, update: Partial<ActivityInsert>) => {
  const parsedUpdate = parse(partial(strict(ActivityInsertSchema)), update);
  const validUpdate = { ...parsedUpdate };

  const requestsAmountFormulaUpdate = parsedUpdate.amountFormula !== undefined;
  if (requestsAmountFormulaUpdate) validUpdate.amount = parsedUpdate.amountFormula == null ? null : evaluateAmountFormula(parsedUpdate.amountFormula);

  const requestsAmountUpdate = validUpdate.amount !== undefined;
  const requestsUnitUpdate = parsedUpdate.unitId !== undefined;
  const requestsEmissionFactorUpdate = parsedUpdate.emissionFactorId !== undefined;

  if (requestsAmountUpdate || requestsUnitUpdate || requestsEmissionFactorUpdate) {
    const activity = await db.query.Activity.findFirst({ where: eq(Activity.id, activityId), with: { unit: true, factor: true } });

    const amount = requestsAmountUpdate ? parsedUpdate.amount : activity?.amount;

    const emissionFactor = requestsEmissionFactorUpdate
      ? parsedUpdate.emissionFactorId === null
        ? null
        : await getEmissionFactor(parsedUpdate.emissionFactorId!)
      : activity?.factor;

    const activityUnitId = requestsUnitUpdate ? parsedUpdate.unitId : activity?.unitId;

    if (emissionFactor?.unitId !== activityUnitId || amount === null) validUpdate.co2e = null;
    else if (!isNaN(amount!) && !isNaN(emissionFactor?.co2e!)) validUpdate.co2e = amount! * emissionFactor!.co2e!;
  }

  await db.update(Activity).set(validUpdate).where(eq(Activity.id, activityId));
  revalidatePath("/[company][location]");
};
