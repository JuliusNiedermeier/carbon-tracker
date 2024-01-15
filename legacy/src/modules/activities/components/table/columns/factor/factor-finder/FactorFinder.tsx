import { TableBody, TableRow } from "@/common/components/ui/table";
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
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Badge } from "@/common/components/ui/badge";
import { PageSubtitle, PageTitle } from "@/common/components/PageTitle";
import { Frown } from "lucide-react";

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
    <div className="w-full h-full overflow-auto rounded-md">
      <table className="w-full min-h-full table-fixed caption-bottom text-sm">
        <colgroup>
          <col className="w-1/2" />
          <col />
          <col />
          <col />
          <col />
        </colgroup>

        <thead className="sticky top-0 bg-background">
          <tr className="border-none">
            <th colSpan={5} className="p-0">
              <div className="flex flex-row items-center gap-4 pl-6 hover:bg-muted focus-within:bg-muted">
                <Badge className="gap-2">
                  <MagnifyingGlassIcon /> Factor search
                </Badge>
                <input
                  className="px-8 py-4 flex-1 bg-transparent outline-none mt-0"
                  placeholder="Describe your activity here."
                  value={description}
                  onInput={(e) => setDescription(e.currentTarget.value)}
                />
              </div>
              <hr />
            </th>
          </tr>
          <tr className="border-none">
            <CategoryHeader />
            <UnitHeader units={props.units} selection={unitIds} onSelectionChange={setUnits} />
            <YearHeader years={props.emissionFactorYears} selection={years} onSelectionChange={setYears} />
            <SourceHeader sources={props.emissionFactorSources} selection={emissionFactorSourceIds} onSelectionChange={setEmissionFactorSourceIds} />
            <FactorHeader />
          </tr>
          <tr>
            <th colSpan={5}>
              <hr />
            </th>
          </tr>
        </thead>

        <TableBody className="min-h-36">
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
              ) : factors.length ? (
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
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="grid place-items-center">
                      <Frown />
                      <PageTitle className="font-medium text-lg mt-4">No suitable factor found.</PageTitle>
                      <PageSubtitle>Try changing how you describe the Activity, or try removing all the filters.</PageSubtitle>
                    </div>
                  </td>
                </tr>
              )
            }
          </FactorReccommendations>
        </TableBody>

        {props.selectedFactor && (
          <tfoot className="sticky bottom-0 bg-gray-100">
            <tr>
              <th colSpan={5}>
                <hr />
              </th>
            </tr>
            <TableRow className="bg-muted hover:bg-muted border-none sticky bottom-0">
              <CategoryCell categories={props.selectedFactor.categories} />
              <UnitCell unit={props.selectedFactor.unit} />
              <YearCell year={props.selectedFactor.year} />
              <SourceCell source={props.selectedFactor.source} />
              <FactorCell factor={props.selectedFactor.co2e} />
            </TableRow>
          </tfoot>
        )}
      </table>
    </div>
  );
};
