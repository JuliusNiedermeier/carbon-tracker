import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { ColumnMetaData } from "../../../_columns";
import { YearHeader } from "./header";
import { YearCell } from "./cell";
import { YearFooter } from "./footer";
import { GroupToggleCell } from "../../table-utils/cells/group-toggle-cell";

const ID = "year";

export const yearColumnDef = {
  accessorFn: ({ year }) => year,
  id: ID,
  header: YearHeader,
  cell: YearCell,
  footer: YearFooter,
  aggregatedCell: AggregatedCell,
  size: 80,
} as const satisfies AccessorFnColumnDef<Activity, number | null>;

export const yearColumnMeta = {
  ID,
  name: "Year",
  description: "The year in which an activity has been conducted",
  dataUpdateKey: "year",
  lockable: true,
  groupToggle: GroupToggleCell,
} as const satisfies ColumnMetaData<number | null>;
