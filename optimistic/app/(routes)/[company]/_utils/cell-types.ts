import { CellContext, DeepKeys, DeepValue, HeaderContext } from "@tanstack/react-table";
import { Activity } from "../_hooks/use-activities";

export type ActivityHeaderContext<DeepKey extends DeepKeys<Activity>> = HeaderContext<Activity, DeepValue<Activity, DeepKey>>;
export type ActivityCellContext<DeepKey extends DeepKeys<Activity>> = CellContext<Activity, DeepValue<Activity, DeepKey>>;
export type ActivityDisplayHeaderContext = HeaderContext<Activity, unknown>;
export type ActivityDisplayCellContext = CellContext<Activity, unknown>;
