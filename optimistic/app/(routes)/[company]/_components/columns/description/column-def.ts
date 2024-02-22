import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { ColumnMetaData } from "../../../_columns";
import { DescriptionHeader } from "./header";
import { DescriptionCell } from "./cell";
import { DescriptionFooter } from "./footer";
import { GroupToggleCell } from "../../table-utils/cells/group-toggle-cell";

const ID = "description";

export const descriptionColumnDef = {
  accessorFn: ({ description }) => description,
  id: ID,
  header: DescriptionHeader,
  cell: DescriptionCell,
  footer: DescriptionFooter,
  aggregatedCell: AggregatedCell,
  size: 300,
} as const satisfies AccessorFnColumnDef<Activity, string>;

export const descriptionColumnMeta = {
  ID,
  name: "Description",
  description: "Description of the activity that has been conducted",
  dataUpdateKey: "description",
  lockable: true,
  groupToggle: GroupToggleCell,
} as const satisfies ColumnMetaData<string>;
