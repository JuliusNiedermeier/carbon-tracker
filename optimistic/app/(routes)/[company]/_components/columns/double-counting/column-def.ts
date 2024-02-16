import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { DoubleCountingHeader } from "./header";
import { DoubleCountingCell } from "./cell";
import { DoubleCountingFooter } from "./footer";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";

const ID = "double-counting";

export const doubleCountingColumnDef = {
  accessorFn: ({ doubleCounting }) => doubleCounting,
  id: ID,
  header: DoubleCountingHeader,
  cell: DoubleCountingCell,
  footer: DoubleCountingFooter,
  aggregatedCell: AggregatedCell,
  size: 150,
} as const satisfies AccessorFnColumnDef<Activity, boolean | null>;

export const doubleCountingColumnMeta = {
  ID,
  name: "Double counting",
  description: "",
  dataUpdateKey: "doubleCounting",
  lockable: true,
} as const satisfies BaseColumnMetaData;
