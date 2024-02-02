import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EmissionFactorReccommendation } from "../../_hooks/use-emission-factor-reccommendations";
import { Cell } from "../cell";
import { CategoryHeader } from "./columns/category/header";
import { CategoryCell } from "./columns/category/cell";
import { UnitHeader } from "./columns/unit/header";
import { YearHeader } from "./columns/year/header";
import { SourceHeader } from "./columns/source/header";
import { CO2eHeader } from "./columns/co2e/header";
import { CO2eCell } from "./columns/co2e/cell";
import { UnitCell } from "./columns/unit/cell";
import { YearCell } from "./columns/year/cell";
import { SourceCell } from "./columns/source/cell";
import { CategoryFooter } from "./columns/category/footer";
import { UnitFooter } from "./columns/unit/footer";
import { YearFooter } from "./columns/year/footer";
import { SourceFooter } from "./columns/source/footer";
import { CO2eFooter } from "./columns/co2e/footer";

const ch = createColumnHelper<EmissionFactorReccommendation>();

export const columns = [
  ch.accessor("categoryPath", {
    id: "category",
    header: CategoryHeader,
    cell: CategoryCell,
    footer: CategoryFooter,
  }),
  ch.accessor("unit.abbreviation", {
    header: UnitHeader,
    cell: UnitCell,
    footer: UnitFooter,
    size: 130,
  }),
  ch.accessor("year", {
    header: YearHeader,
    cell: YearCell,
    footer: YearFooter,
    size: 130,
  }),
  ch.accessor("emissionFactorSource.name", {
    header: SourceHeader,
    cell: SourceCell,
    footer: SourceFooter,
    size: 130,
  }),
  ch.accessor("co2e", {
    header: CO2eHeader,
    cell: CO2eCell,
    footer: CO2eFooter,
    size: 130,
  }),
] as const satisfies ColumnDef<EmissionFactorReccommendation, any>[];
