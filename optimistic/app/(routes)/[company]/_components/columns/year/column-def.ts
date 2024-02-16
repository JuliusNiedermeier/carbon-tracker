import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";
import { YearHeader } from "./header";
import { YearCell } from "./cell";
import { YearFooter } from "./footer";

export const yearColumnDef = {
  accessorFn: ({ year }) => year, // year column in db should not be of type bigint
  id: "year",
  header: YearHeader,
  cell: YearCell,
  footer: YearFooter,
  aggregatedCell: AggregatedCell,
  size: 80,
} as const satisfies AccessorFnColumnDef<Activity, bigint | null>;

export const yearColumnMeta = {
  name: "Year",
  description: "The year in which an activity has been conducted",
  dataUpdateKey: "year",
  lockable: true,
} as const satisfies BaseColumnMetaData;
