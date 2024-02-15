import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Activity } from "./_hooks/use-activities";
import { AggregatedCell } from "./_components/table-utils/cells/aggregated-cell";
import { CompanyCell } from "./_components/columns/company/cell";
import { CompanyHeader } from "./_components/columns/company/header";
import { LocationHeader } from "./_components/columns/location/header";
import { LocationCell } from "./_components/columns/location/cell";
import { DescriptionCell } from "./_components/columns/description/cell";
import { DescriptionHeader } from "./_components/columns/description/header";
import { ScopeHeader } from "./_components/columns/scope/header";
import { ScopeCell } from "./_components/columns/scope/cell";
import { AmountHeader } from "./_components/columns/amount/header";
import { AmountCell } from "./_components/columns/amount/cell";
import { UnitHeader } from "./_components/columns/unit/header";
import { UnitCell } from "./_components/columns/unit/cell";
import { FactorHeader } from "./_components/columns/factor/header";
import { FactorCell } from "./_components/columns/factor/cell";
import { Co2eHeader } from "./_components/columns/co2e/header";
import { Co2eCell } from "./_components/columns/co2e/cell";
import { DoubleCountingHeader } from "./_components/columns/double-counting/header";
import { DoubleCountingCell } from "./_components/columns/double-counting/cell";
import { BiogenicShareHeader } from "./_components/columns/biogenic-share/header";
import { BiogenicShareCell } from "./_components/columns/biogenic-share/cell";
import { SelectCell } from "./_components/columns/select/cell";
import { SelectHeader } from "./_components/columns/select/header";
import { ScopeFooter } from "./_components/columns/scope/footer";
import { BlankCell } from "./_components/table-utils/cells/blank-cell";
import { DescriptionFooter } from "./_components/columns/description/footer";
import { YearHeader } from "./_components/columns/year/header";
import { YearCell } from "./_components/columns/year/cell";
import { UnitFooter } from "./_components/columns/unit/footer";
import { YearFooter } from "./_components/columns/year/footer";
import { DoubleCountingFooter } from "./_components/columns/double-counting/footer";
import { BiogenicShareFooter } from "./_components/columns/biogenic-share/footer";
import { FactorFooter } from "./_components/columns/factor/footer";

const ch = createColumnHelper<Activity>();

export const columns = [
  ch.display({
    id: "select",
    header: SelectHeader,
    cell: SelectCell,
    footer: BlankCell,
    aggregatedCell: AggregatedCell,
    size: 40,
    minSize: 40,
    enableResizing: false,
  }),
  ch.accessor("companyName", {
    id: "company",
    header: CompanyHeader,
    cell: CompanyCell,
    footer: BlankCell,
    aggregatedCell: AggregatedCell,
  }),
  ch.accessor("locationName", {
    id: "location",
    header: LocationHeader,
    cell: LocationCell,
    footer: BlankCell,
    aggregatedCell: AggregatedCell,
  }),
  ch.accessor("description", {
    id: "description",
    header: DescriptionHeader,
    cell: DescriptionCell,
    footer: DescriptionFooter,
    aggregatedCell: AggregatedCell,
    size: 300,
  }),
  ch.accessor("scope.name", {
    id: "scope",
    header: ScopeHeader,
    cell: ScopeCell,
    aggregatedCell: AggregatedCell,
    footer: ScopeFooter,
  }),
  ch.accessor("amount", {
    id: "amount",
    header: AmountHeader,
    cell: AmountCell,
    footer: BlankCell,
    aggregatedCell: AggregatedCell,
    aggregationFn: "sum",
  }),
  ch.accessor("unit.abbreviation", {
    id: "unit",
    header: UnitHeader,
    cell: UnitCell,
    footer: UnitFooter,
    aggregatedCell: AggregatedCell,
    size: 180,
  }),
  ch.accessor("factor.co2e", {
    id: "factor",
    header: FactorHeader,
    cell: FactorCell,
    footer: FactorFooter,
    aggregatedCell: AggregatedCell,
  }),
  ch.accessor("co2e", {
    id: "co2e",
    header: Co2eHeader,
    cell: Co2eCell,
    footer: BlankCell,
    aggregatedCell: AggregatedCell,
    size: 140,
  }),
  ch.accessor("doubleCounting", {
    id: "doubleCounting",
    header: DoubleCountingHeader,
    cell: DoubleCountingCell,
    footer: DoubleCountingFooter,
    aggregatedCell: AggregatedCell,
    size: 150,
  }),
  ch.accessor("biogenicShare", {
    id: "biogenicShare",
    header: BiogenicShareHeader,
    cell: BiogenicShareCell,
    footer: BiogenicShareFooter,
    aggregatedCell: AggregatedCell,
    size: 130,
  }),
  ch.accessor("year", {
    id: "year",
    header: YearHeader,
    cell: YearCell,
    footer: YearFooter,
    aggregatedCell: AggregatedCell,
    size: 80,
  }),
] as const satisfies ColumnDef<Activity, never>[];
