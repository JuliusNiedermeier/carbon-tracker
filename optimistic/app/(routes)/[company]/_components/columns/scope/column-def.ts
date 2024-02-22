import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { ColumnMetaData } from "../../../_columns";
import { ScopeHeader } from "./header";
import { ScopeCell } from "./cell";
import { ScopeFooter } from "./footer";
import { GroupToggleCell } from "../../table-utils/cells/group-toggle-cell";

const ID = "scope";

export const buildCompoundScopeNumber = (scope: number, subScope: number) => (scope + subScope / 100).toFixed(2);

export const scopeColumnDef = {
  accessorFn: ({ scope }) => (scope !== null ? buildCompoundScopeNumber(scope.scope, scope.subScope) : ""),
  id: ID,
  header: ScopeHeader,
  cell: ScopeCell,
  footer: ScopeFooter,
  aggregatedCell: AggregatedCell,
  sortingFn: (rowA, rowB) => {
    if (rowA.original.scope?.scope !== rowB.original.scope?.scope) return (rowA.original.scope?.scope || 0) - (rowB.original.scope?.scope || 0);
    else return (rowA.original.scope?.subScope || 0) - (rowB.original.scope?.subScope || 0);
  },
} as const satisfies AccessorFnColumnDef<Activity, string>;

export const scopeColumnMeta = {
  ID,
  name: "Scope",
  description: "The GHG Scope an activity belongs to",
  dataUpdateKey: "scopeId",
  lockable: true,
  groupToggle: GroupToggleCell,
} as const satisfies ColumnMetaData<string>;
