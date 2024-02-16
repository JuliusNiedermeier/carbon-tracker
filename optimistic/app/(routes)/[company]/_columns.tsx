import { ColumnDef } from "@tanstack/react-table";
import { amountColumnDef } from "./_components/columns/amount/column-def";
import { biogenicShareColumnDef } from "./_components/columns/biogenic-share/column-def";
import { selectColumnDef } from "./_components/columns/select/column-def";
import { companyColumnDef } from "./_components/columns/company/column-def";
import { locationColumnDef } from "./_components/columns/location/column-def";
import { descriptionColumnDef } from "./_components/columns/description/column-def";
import { scopeColumnDef } from "./_components/columns/scope/column-def";
import { unitColumnDef } from "./_components/columns/unit/column-def";
import { factorColumnDef } from "./_components/columns/factor/column-def";
import { co2eEmissionColumnDef } from "./_components/columns/co2e/column-def";
import { doubleCountingColumnDef } from "./_components/columns/double-counting/column-def";
import { yearColumnDef } from "./_components/columns/year/column-def";
import { Activity } from "./_hooks/use-activities";

export type BaseColumnMetaData = {
  name: string;
  description: string;
  dataUpdateKey: keyof Activity | null;
  lockable: boolean;
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
