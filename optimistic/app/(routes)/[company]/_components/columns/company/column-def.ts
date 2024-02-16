import { AccessorFnColumnDef, IdentifiedColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";
import { BlankCell } from "../../table-utils/cells/blank-cell";
import { CompanyHeader } from "./header";
import { CompanyCell } from "./cell";

const ID = "company";

export const companyColumnDef = {
  accessorFn: ({ companyName }) => companyName,
  id: ID,
  header: CompanyHeader,
  cell: CompanyCell,
  footer: BlankCell,
  aggregatedCell: AggregatedCell,
} as const satisfies AccessorFnColumnDef<Activity, string>;

export const companyColumnMeta = {
  ID,
  name: "Company",
  description: "The company under which an activity has been conducted",
  dataUpdateKey: null,
  lockable: false,
} as const satisfies BaseColumnMetaData;
