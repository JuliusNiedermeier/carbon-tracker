import { DialogHeader } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Table, TableBody, TableHeader, TableRow } from "@/common/components/ui/table";
import { ComponentProps, FC, useState } from "react";
import { CategoryHeader } from "./columns/category/CategoryHeader";
import { UnitHeader } from "./columns/unit/UnitHeader";
import { YearHeader } from "./columns/year/YearHeader";
import { SourceHeader } from "./columns/source/SourceHeader";
import { CategoryCell } from "./columns/category/CategoryCell";
import { UnitCell } from "./columns/unit/UnitCell";
import { YearCell } from "./columns/year/YearCell";
import { SourceCell } from "./columns/source/SourceCell";
import { FactorReccommendations } from "./FactorReccommendations";
import { useDebounce } from "use-debounce";
import { EmissionFactorSourceSelect, UnitSelect } from "@/common/database/schema";
import { SkeletonRow } from "./SkeletonRows";
import { FactorCell } from "./columns/factor/FactorCell";
import { FactorHeader } from "./columns/factor/FactorHeader";

interface Props {
  defaultDescription?: string;

  units: UnitSelect[];
  defaultUnitIds?: number[];

  emissionFactorSources: EmissionFactorSourceSelect[];
  defaultEmissionFactorSourceIds?: number[];

  emissionFactorYears: number[];
  defaultEmissionFactorYears?: number[];

  selectedFactor?: { categories: string[]; unit: string; year: number; source: string; co2e: number };

  onFactorSelected?: (factor: FactorReccommendation) => any;
}

type FactorReccommendation = Parameters<ComponentProps<typeof FactorReccommendations>["children"]>[0][number];

export const FactorFinder: FC<Props> = (props) => {
  const [description, setDescription] = useState(props.defaultDescription);
  const [debouncedDescription] = useDebounce(description, 1000);

  const [unitIds, setUnits] = useState(props.defaultUnitIds || null);
  const [years, setYears] = useState(props.defaultEmissionFactorYears || null);
  const [emissionFactorSourceIds, setEmissionFactorSourceIds] = useState(props.defaultEmissionFactorSourceIds || null);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 bg-muted border-b">
        <DialogHeader>
          <span className="font-medium text-lg">Emission factor finder</span>
        </DialogHeader>
        <Input className="mt-4 p-6 bg-background" value={description} onInput={(e) => setDescription(e.currentTarget.value)} />
      </div>
      <div className="flex-1 overflow-auto">
        <Table className="max-w-full table-fixed">
          <colgroup>
            <col className="w-1/2" />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <TableHeader>
            {props.selectedFactor && (
              <TableRow className="bg-green-100 hover:bg-green-100">
                <CategoryCell categories={props.selectedFactor.categories} />
                <UnitCell unit={props.selectedFactor.unit} />
                <YearCell year={props.selectedFactor.year} />
                <SourceCell source={props.selectedFactor.source} />
                <FactorCell factor={props.selectedFactor.co2e} />
              </TableRow>
            )}
            <TableRow>
              <CategoryHeader />
              <UnitHeader units={props.units} selection={unitIds} onSelectionChange={setUnits} />
              <YearHeader years={props.emissionFactorYears} selection={years} onSelectionChange={setYears} />
              <SourceHeader sources={props.emissionFactorSources} selection={emissionFactorSourceIds} onSelectionChange={setEmissionFactorSourceIds} />
              <FactorHeader />
            </TableRow>
          </TableHeader>

          <TableBody className="relative">
            <FactorReccommendations
              description={debouncedDescription || ""}
              unitIds={unitIds || undefined}
              years={years || undefined}
              sourceIds={emissionFactorSourceIds || undefined}
            >
              {(factors, loading) =>
                loading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-background" />
                  </>
                ) : (
                  factors.map((factor) => (
                    <TableRow key={factor.id} onClick={() => props.onFactorSelected && props.onFactorSelected(factor)}>
                      <CategoryCell
                        categories={(factor.categoryPath as any)?.nodes
                          .slice()
                          .map(({ name }: { name: string }) => name)
                          .reverse()}
                      />
                      <UnitCell unit={factor.unit.abbreviation} />
                      <YearCell year={factor.year} />
                      <SourceCell source={factor.emissionFactorSource.name} />
                      <FactorCell factor={factor.co2e} />
                    </TableRow>
                  ))
                )
              }
            </FactorReccommendations>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
