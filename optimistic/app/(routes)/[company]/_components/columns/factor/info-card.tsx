import { Badge } from "@/app/_components/ui/badge";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { FC, PropsWithChildren } from "react";
import { useEmissionFactorInfo } from "../../../_hooks/use-emission-factor-info";
import { numberFormat } from "@/app/_utils/number-formats";

interface Props {
  emissionFactorId: number;
  emissionFactorCategoryId: number;
  unit: { abbreviation: string; name?: string | null };
  co2e: number | null;
  unitMatches: boolean;
}

const PropertyLine: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex items-center justify-between gap-6">{children}</div>;
};

const PropertyLabel: FC<PropsWithChildren> = ({ children }) => {
  return <span className="whitespace-nowrap font-normal text-sm text-muted-foreground">{children}</span>;
};

const PropertyValue: FC<PropsWithChildren> = ({ children }) => {
  return <span className="whitespace-nowrap font-medium text-sm">{children}</span>;
};

export const FactorInfoCard: FC<Props> = ({ emissionFactorId, emissionFactorCategoryId, unit, co2e, unitMatches }) => {
  const { data: factorInfo, isLoading } = useEmissionFactorInfo(emissionFactorId);

  return (
    <div className="min-w-[20rem]">
      <div className="flex flex-wrap gap-2 p-4 ">
        {isLoading ? (
          <>
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-12 h-4" />
            <Skeleton className="w-36 h-4" />
            <Skeleton className="w-20 h-4" />
          </>
        ) : (
          factorInfo?.categories.map((category, index) => (
            <Badge key={index} variant="outline">
              {category}
            </Badge>
          ))
        )}
      </div>
      <div className="border-t border-b px-4 py-4 grid gap-2">
        <PropertyLine>
          <PropertyLabel>Unit</PropertyLabel>
          <PropertyValue>
            <span className="whitespace-nowrap font-normal text-sm text-muted-foreground mr-4">-</span>
            <Badge variant={unitMatches ? "default" : "destructive"}>{unit.abbreviation}</Badge>
          </PropertyValue>
        </PropertyLine>
        <PropertyLine>
          <PropertyLabel>Published by</PropertyLabel>
          {isLoading ? <Skeleton className="h-4 w-14" /> : <PropertyValue>{factorInfo?.source}</PropertyValue>}
        </PropertyLine>
        <PropertyLine>
          <PropertyLabel>Published in</PropertyLabel>
          {isLoading ? <Skeleton className="h-4 w-20" /> : <PropertyValue>{factorInfo?.year}</PropertyValue>}
        </PropertyLine>
      </div>
      <div className="bg-muted p-4">
        <div className="flex items-center justify-between">
          <span>Factor</span>
          <Badge variant={typeof co2e === "number" ? "default" : "outline"} className="font-mono font-normal">
            {co2e !== null ? numberFormat.format(co2e) : "Missing"}
          </Badge>
        </div>
      </div>
    </div>
  );
};
