import { AccessorFnColumnDef } from "@tanstack/react-table";
import { Activity } from "../../../_hooks/use-activities";
import { AggregatedCell } from "../../table-utils/cells/aggregated-cell";
import { BaseColumnMetaData } from "../../../_columns";
import { LocationHeader } from "./header";
import { LocationCell } from "./cell";
import { LocationFooter } from "./footer";

const ID = "location";

export const locationColumnDef = {
  accessorFn: ({ locationName }) => locationName,
  id: ID,
  header: LocationHeader,
  cell: LocationCell,
  footer: LocationFooter,
  aggregatedCell: AggregatedCell,
} as const satisfies AccessorFnColumnDef<Activity, string>;

export const locationColumnMeta = {
  ID,
  name: "Location",
  description: "The location at which an actiivty has been conducted",
  dataUpdateKey: "locationId",
  lockable: true,
} as const satisfies BaseColumnMetaData;
