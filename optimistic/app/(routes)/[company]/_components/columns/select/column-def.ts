import { DisplayColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { ColumnMetaData } from "../../../_columns";
import { SelectHeader } from "./header";
import { SelectCell } from "./cell";
import { BlankCell } from "../../table-utils/cells/blank-cell";
import { GroupToggleCell } from "../../table-utils/cells/group-toggle-cell";
import { SelectAggregateCell } from "./aggregate-cell";

const ID = "row-select";

export const selectColumnDef = {
  id: ID,
  header: SelectHeader,
  cell: SelectCell,
  footer: BlankCell,
  aggregatedCell: SelectAggregateCell,
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
  groupToggle: GroupToggleCell,
} as const satisfies ColumnMetaData<never>;
