"use server";

import { db } from "@/common/database/client";
import { Activity, ActivityInsert, ActivityInsertSchema, EmissionFactor } from "@/common/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { parse, partial, strict } from "valibot";

export const getEmissionFactor = async (emissionFactorId: number) => {
  const emissionFactor = await db.query.EmissionFactor.findFirst({ where: eq(EmissionFactor.id, emissionFactorId) });
  return emissionFactor;
};

export const updateActvity = async (activityId: number, update: Partial<ActivityInsert>) => {
  const parsedUpdate = parse(partial(strict(ActivityInsertSchema)), update);
  const validUpdate = { ...parsedUpdate };

  const requestsAmountUpdate = typeof update.amount === "number";
  const requestsUnitUpdate = typeof update.unitId === "number";
  const requestsEmissionFactorUpdate = typeof update.emissionFactorId === "number";

  if (requestsAmountUpdate || requestsUnitUpdate || requestsEmissionFactorUpdate) {
    const activity = await db.query.Activity.findFirst({ where: eq(Activity.id, activityId), with: { unit: true, factor: true } });

    const amount = requestsAmountUpdate ? parsedUpdate.amount : activity?.amount;

    const emissionFactor = requestsEmissionFactorUpdate ? await getEmissionFactor(parsedUpdate.emissionFactorId!) : await activity?.factor;

    const activityUnitId = requestsUnitUpdate ? parsedUpdate.unitId! : activity?.unitId;

    if (emissionFactor?.unitId !== activityUnitId) validUpdate.co2e = null;
    else if (!isNaN(amount!) && !isNaN(emissionFactor?.co2e!)) validUpdate.co2e = amount! * emissionFactor!.co2e!;
  }

  await db.update(Activity).set(validUpdate).where(eq(Activity.id, activityId));
  revalidatePath("/");
};
