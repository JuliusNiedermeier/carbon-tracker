import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";
import { BlankCell } from "../../table-utils/cells/blank-cell";
import { CompanyHeader } from "./header";
import { CompanyCell } from "./cell";

export const companyColumnDef = {
  accessorFn: ({ companyName }) => companyName,
  id: "company",
  header: CompanyHeader,
  cell: CompanyCell,
  footer: BlankCell,
  aggregatedCell: AggregatedCell,
} as const satisfies AccessorFnColumnDef<Activity, string>;

export const companyColumnMeta = {
  name: "Company",
  description: "The company under which an activity has been conducted",
  dataUpdateKey: null,
  lockable: false,
} as const satisfies BaseColumnMetaData;
