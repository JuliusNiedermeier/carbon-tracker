import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";
import { ScopeHeader } from "./header";
import { ScopeCell } from "./cell";
import { ScopeFooter } from "./footer";

const ID = "scope";

export const scopeColumnDef = {
  accessorFn: ({ locationName }) => locationName,
  id: ID,
  header: ScopeHeader,
  cell: ScopeCell,
  footer: ScopeFooter,
  aggregatedCell: AggregatedCell,
} as const satisfies AccessorFnColumnDef<Activity, string>;

export const scopeColumnMeta = {
  ID,
  name: "Scope",
  description: "The GHG Scope an activity belongs to",
  dataUpdateKey: "scopeId",
  lockable: true,
} as const satisfies BaseColumnMetaData;
