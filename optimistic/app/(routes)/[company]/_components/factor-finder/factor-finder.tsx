import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ComponentProps, Dispatch, FC, Fragment, SetStateAction, createContext, useContext, useState } from "react";
import { useEmissionFactorReccommendations } from "../../_hooks/use-emission-factor-reccommendations";
import { columns } from "./columns";
import { useDebounce } from "use-debounce";
import { Row } from "../row";
import { ScrollArea, ScrollAreaViewport } from "@/app/_components/ui/scroll-area";
import { EmissionFactorInfo, useEmissionFactorInfo } from "../../_hooks/use-emission-factor-info";
import { cn } from "@/app/_utils/cn";
import { SearchX } from "lucide-react";

type FactorFinderContext = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  unitID: number | null;
  setUnitID: Dispatch<SetStateAction<number | null>>;
  year: number | null;
  setYear: Dispatch<SetStateAction<number | null>>;
  sourceID: number | null;
  setSourceID: Dispatch<SetStateAction<number | null>>;
  selectedFactorID: number | null;
  setSelectedFactorID: FactorFinderProps["onSelect"];
  selectedFactorInfo?: EmissionFactorInfo;
};

const FactorFinderContext = createContext<FactorFinderContext | null>(null);

export const useFactorFinder = () => {
  const context = useContext(FactorFinderContext);
  if (!context) throw new Error("The hook useFactorFinder must be wrapped in a FactorFinder.");
  return context;
};

type FactorFinderProps = {
  onSelect: (factorID: number | null) => any;
  selectedFactorID: number | null;
  initialSearchTerm: string;
  initialUnitID?: number | null;
  initialYear?: number | null;
  initialSourceID?: number | null;
};

export const FactorFinder: FC<FactorFinderProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState(props.initialSearchTerm);
  const [unitID, setUnitID] = useState(props.initialUnitID || null);
  const [year, setYear] = useState(props.initialYear || null);
  const [sourceID, setSourceID] = useState(props.initialSourceID || null);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const { data: reccommendedFactors, isFetching: isReccommendationsFetching } = useEmissionFactorReccommendations(debouncedSearchTerm, {
    years: year === null ? undefined : [year],
    unitIds: unitID === null ? undefined : [unitID],
    emissionFactorSourceIds: sourceID === null ? undefined : [sourceID],
  });

  const noFactorsFound = !isReccommendationsFetching && !reccommendedFactors.length;

  const { data: selectedFactor, isLoading: isSelectedFactorLoading } = useEmissionFactorInfo(props.selectedFactorID);

  const createFactorRowClickHandler =
    (factorID: number): ComponentProps<typeof Row>["onClick"] =>
    () =>
      props.onSelect?.(factorID);

  const table = useReactTable({
    data: reccommendedFactors || [],
    columns: columns,
    defaultColumn: { size: 200, minSize: 80, maxSize: 500 },
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  return (
    <FactorFinderContext.Provider
      value={{
        selectedFactorID: props.selectedFactorID,
        searchTerm,
        setSearchTerm,
        unitID,
        setUnitID,
        year,
        setYear,
        sourceID,
        setSourceID,
        selectedFactorInfo: selectedFactor,
        setSelectedFactorID: props.onSelect,
      }}
    >
      <div className="grid h-full" style={{ gridTemplateRows: "min-content 1fr min-content" }}>
        <div className="flex bg-neutral-200 h-10 shadow-sm border-b border-neutral-300">
          {table.getHeaderGroups()[0].headers.map((header) => (
            <Fragment key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
          ))}
        </div>

        {noFactorsFound ? (
          <div className="grid place-content-center">
            <div className="flex items-center gap-8">
              <div className="rounded-lg p-2 bg-orange-200 text-orange-600">
                <SearchX />
              </div>
              <div className="grid">
                <span className="text-foreground font-medium">No matching factor found</span>
                <span className="text-muted-foreground text-sm">Try adjusting the search term or clearing the unit filter</span>
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea direction="both" className="w-full">
            <ScrollAreaViewport>
              {table.getRowModel().rows.map((row) => (
                <Row
                  key={row.id}
                  height={70}
                  selected={row.original.id === props.selectedFactorID}
                  className={cn("py-2 w-full cursor-pointer", { "cursor-default": row.original.id === props.selectedFactorID })}
                  onClick={createFactorRowClickHandler(row.original.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>
                  ))}
                </Row>
              ))}
            </ScrollAreaViewport>
          </ScrollArea>
        )}

        {props.selectedFactorID && (
          <div className="flex h-[70px] border-t bg-neutral-200 border-neutral-300">
            {table.getFooterGroups()[0].headers.map((footer) => (
              <Fragment key={footer.id}>{flexRender(footer.column.columnDef.footer, footer.getContext())}</Fragment>
            ))}
          </div>
        )}
      </div>
    </FactorFinderContext.Provider>
  );
};
