import { CellContext, ColumnDef, ColumnDefBase, ColumnDefTemplate, RowData } from "@tanstack/react-table";
import { amountColumnDef, amountColumnMeta } from "./_components/columns/amount/column-def";
import { biogenicShareColumnDef, biogenicShareColumnMeta } from "./_components/columns/biogenic-share/column-def";
import { selectColumnDef, selectColumnMeta } from "./_components/columns/select/column-def";
import { companyColumnDef, companyColumnMeta } from "./_components/columns/company/column-def";
import { locationColumnDef, locationColumnMeta } from "./_components/columns/location/column-def";
import { descriptionColumnDef, descriptionColumnMeta } from "./_components/columns/description/column-def";
import { scopeColumnDef, scopeColumnMeta } from "./_components/columns/scope/column-def";
import { unitColumnDef, unitColumnMeta } from "./_components/columns/unit/column-def";
import { factorColumnDef, factorColumnMeta } from "./_components/columns/factor/column-def";
import { co2eEmissionColumnDef, co2eEmissionColumnMeta } from "./_components/columns/co2e/column-def";
import { doubleCountingColumnDef, doubleCountingColumnMeta } from "./_components/columns/double-counting/column-def";
import { yearColumnDef, yearColumnMeta } from "./_components/columns/year/column-def";
import { Activity } from "./_hooks/use-activities";

export type ColumnMetaData<TValue> = {
  ID: string;
  name: string;
  description: string;
  dataUpdateKey: keyof Activity | null;
  lockable: boolean;
  groupToggle: ColumnDefTemplate<CellContext<Activity, TValue>>;
};

export const columns = [
  selectColumnDef,
  yearColumnDef,
  companyColumnDef,
  locationColumnDef,
  descriptionColumnDef,
  scopeColumnDef,
  amountColumnDef,
  unitColumnDef,
  factorColumnDef,
  co2eEmissionColumnDef,
  biogenicShareColumnDef,
  doubleCountingColumnDef,
] as const satisfies ColumnDef<Activity, any>[];

export const columnMetadata = [
  selectColumnMeta,
  yearColumnMeta,
  companyColumnMeta,
  locationColumnMeta,
  descriptionColumnMeta,
  scopeColumnMeta,
  amountColumnMeta,
  unitColumnMeta,
  factorColumnMeta,
  co2eEmissionColumnMeta,
  biogenicShareColumnMeta,
  doubleCountingColumnMeta,
] as const satisfies ColumnMetaData<any>[];
