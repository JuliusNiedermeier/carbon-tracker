import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { BiogenicShareHeader } from "./header";
import { BiogenicShareCell } from "./cell";
import { BiogenicShareFooter } from "./footer";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { ColumnMetaData } from "../../../_columns";
import { BiogenicShareGroupToggle } from "./group-toggle";

const ID = "biogenic-share";

export const biogenicShareColumnDef = {
  accessorFn: ({ biogenicShare }) => biogenicShare,
  id: ID,
  header: BiogenicShareHeader,
  cell: BiogenicShareCell,
  footer: BiogenicShareFooter,
  aggregatedCell: AggregatedCell,
  size: 130,
} as const satisfies AccessorFnColumnDef<Activity, boolean | null>;

export const biogenicShareColumnMeta = {
  ID,
  name: "Biogenic share",
  description: "",
  dataUpdateKey: "biogenicShare",
  lockable: true,
  groupToggle: BiogenicShareGroupToggle,
} as const satisfies ColumnMetaData<boolean | null>;
