import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { Co2eHeader } from "./header";
import { Co2eCell } from "./cell";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { ColumnMetaData } from "../../../_columns";
import { BlankCell } from "../../table-utils/cells/blank-cell";
import { GroupToggleCell } from "../../table-utils/cells/group-toggle-cell";

const ID = "co2e-emission";

export const co2eEmissionColumnDef = {
  accessorFn: ({ co2e }) => co2e,
  id: ID,
  header: Co2eHeader,
  cell: Co2eCell,
  footer: BlankCell,
  aggregatedCell: AggregatedCell,
  size: 140,
} as const satisfies AccessorFnColumnDef<Activity, number | null>;

export const co2eEmissionColumnMeta = {
  ID,
  name: "CO2e emission",
  description: "CO2 equivalents emitted by an activity",
  dataUpdateKey: "co2e",
  lockable: false,
  groupToggle: GroupToggleCell,
} as const satisfies ColumnMetaData<number | null>;
