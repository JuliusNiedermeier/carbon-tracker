import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { Co2eHeader } from "./header";
import { Co2eCell } from "./cell";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";
import { BlankCell } from "../../table-utils/cells/blank-cell";

export const co2eEmissionColumnDef = {
  accessorFn: ({ co2e }) => co2e,
  id: "co2e-emission",
  header: Co2eHeader,
  cell: Co2eCell,
  footer: BlankCell,
  aggregatedCell: AggregatedCell,
  size: 140,
} as const satisfies AccessorFnColumnDef<Activity, number | null>;

export const co2eEmissionColumnMeta = {
  name: "CO2e emission",
  description: "CO2 equivalents emitted by an activity",
  dataUpdateKey: "co2e",
  lockable: false,
} as const satisfies BaseColumnMetaData;
