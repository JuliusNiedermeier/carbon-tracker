import { DisplayColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";
import { SelectHeader } from "./header";
import { SelectCell } from "./cell";
import { BlankCell } from "../../table-utils/cells/blank-cell";

const ID = "row-select";

export const selectColumnDef = {
  id: ID,
  header: SelectHeader,
  cell: SelectCell,
  footer: BlankCell,
  aggregatedCell: AggregatedCell,
  size: 40,
  minSize: 40,
  enableResizing: false,
  enableHiding: false,
} as const satisfies DisplayColumnDef<Activity>;

export const selectColumnMeta = {
  ID,
  name: "Row select",
  description: "",
  dataUpdateKey: null,
  lockable: false,
} as const satisfies BaseColumnMetaData;
