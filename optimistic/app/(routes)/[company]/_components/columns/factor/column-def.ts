import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { ColumnMetaData } from "../../../_columns";
import { FactorCell } from "./cell";
import { FactorFooter } from "./footer";
import { FactorHeader } from "./header";
import { GroupToggleCell } from "../../table-utils/cells/group-toggle-cell";

const ID = "factor";

export const factorColumnDef = {
  accessorFn: ({ factor }) => factor?.co2e ?? null,
  id: ID,
  header: FactorHeader,
  cell: FactorCell,
  footer: FactorFooter,
  aggregatedCell: AggregatedCell,
} as const satisfies AccessorFnColumnDef<Activity, number | null>;

export const factorColumnMeta = {
  ID,
  name: "Emission factor",
  description: "",
  dataUpdateKey: "emissionFactorId",
  lockable: true,
  groupToggle: GroupToggleCell,
} as const satisfies ColumnMetaData<number | null>;
