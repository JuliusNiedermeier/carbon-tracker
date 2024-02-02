import { CellContext, DeepKeys, DeepValue, HeaderContext } from "@tanstack/react-table";
import { Activity } from "../_hooks/use-activities";
import { EmissionFactorReccommendation } from "../_hooks/use-emission-factor-reccommendations";

export type ActivityHeaderContext<DeepKey extends DeepKeys<Activity>> = HeaderContext<Activity, DeepValue<Activity, DeepKey>>;
export type ActivityCellContext<DeepKey extends DeepKeys<Activity>> = CellContext<Activity, DeepValue<Activity, DeepKey>>;
export type ActivityDisplayHeaderContext = HeaderContext<Activity, unknown>;
export type ActivityDisplayCellContext = CellContext<Activity, unknown>;

export type EmissionFactorFinderHeaderContext<DeepKey extends DeepKeys<EmissionFactorReccommendation>> = HeaderContext<
  EmissionFactorReccommendation,
  DeepValue<EmissionFactorReccommendation, DeepKey>
>;
export type EmissionFactorFinderCellContext<DeepKey extends DeepKeys<EmissionFactorReccommendation>> = CellContext<
  EmissionFactorReccommendation,
  DeepValue<EmissionFactorReccommendation, DeepKey>
>;
export type EmissionFactorFinderDisplayHeaderContext = HeaderContext<EmissionFactorReccommendation, unknown>;
export type EmissionFactorFinderDisplayCellContext = CellContext<EmissionFactorReccommendation, unknown>;
