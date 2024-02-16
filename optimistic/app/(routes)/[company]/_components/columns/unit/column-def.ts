import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";
import { UnitHeader } from "./header";
import { UnitCell } from "./cell";
import { UnitFooter } from "./footer";

export const unitColumnDef = {
  accessorFn: ({ unit }) => unit?.abbreviation ?? "", // Should be unit?.abbreviation ?? null
  id: "unit",
  header: UnitHeader,
  cell: UnitCell,
  footer: UnitFooter,
  aggregatedCell: AggregatedCell,
  size: 180,
} as const satisfies AccessorFnColumnDef<Activity, string>; // should be string | null

export const unitColumnMeta = {
  name: "Unit",
  description: "The unit in which the activity amount is provided",
  dataUpdateKey: "unitId",
  lockable: true,
} as const satisfies BaseColumnMetaData;
