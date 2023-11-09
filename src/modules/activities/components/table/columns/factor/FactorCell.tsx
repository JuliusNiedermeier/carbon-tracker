import { TableCell } from "@/common/components/ui/table";
import { FC, useState } from "react";
import { ActivityCellContext } from "@/modules/activities/components/table/ActivityTable";
import { Button } from "@/common/components/ui/button";
import { CaretSortIcon, ValueNoneIcon } from "@radix-ui/react-icons";
import { EmissionFactorSourceSelect, UnitSelect } from "@/common/database/schema";
import { Dialog, DialogContent, DialogTrigger } from "@/common/components/ui/dialog";
import { FactorFinder } from "./factor-finder/FactorFinder";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Skeleton } from "@/common/components/ui/skeleton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/common/components/ui/hover-card";
import { FactorInfoCard } from "./FactorInfoCard";
import { Badge } from "@/common/components/ui/badge";
import { cn } from "@/common/utils";
import { useMemoComponent } from "@/modules/activities/utils/use-memo-component";

type Props = {
  ctx: ActivityCellContext<"factor.co2e">;
  units: UnitSelect[];
  emissionFactorSources: EmissionFactorSourceSelect[];
  emissionFactorYears: number[];
};

export const FactorCell: FC<Props> = ({ ctx, units, emissionFactorSources, emissionFactorYears }) => {
  const Component = useMemoComponent(_FactorCell);
  return (
    <Component
      emissionFactorCategoryId={ctx.row.original.factor?.emissionFactorCategoryId || null}
      factorId={ctx.row.original.emissionFactorId}
      co2eFactor={ctx.getValue()}
      activityUnitId={ctx.row.original.unitId}
      factorUnitId={ctx.row.original.factor?.unitId || null}
      unitAbbreviation={ctx.row.original.factor?.unit.abbreviation || null}
      unitName={ctx.row.original.factor?.unit.name || null}
      factorYear={ctx.row.original.factor?.year || null}
      activityDescription={ctx.row.original.description}
      activityId={ctx.row.original.id}
      units={units}
      emissionFactorSources={emissionFactorSources}
      emissionFactorYears={emissionFactorYears}
    />
  );
};

type _Props = {
  factorId: number | null;
  factorYear: number | null;
  co2eFactor: number | null;
  activityUnitId: number | null;
  factorUnitId: number | null;
  unitAbbreviation: string | null;
  unitName: string | null;
  activityDescription: string | null;
  activityId: number;
  emissionFactorCategoryId: number | null;
  units: UnitSelect[];
  emissionFactorSources: EmissionFactorSourceSelect[];
  emissionFactorYears: number[];
};

const _FactorCell: FC<_Props> = ({
  factorId,
  factorYear,
  activityId,
  co2eFactor,
  activityUnitId,
  factorUnitId,
  unitAbbreviation,
  unitName,
  emissionFactorCategoryId,
  activityDescription,
  units,
  emissionFactorSources,
  emissionFactorYears,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const co2e = parseFloat(co2eFactor?.toFixed(3) || "");
  const isUnitMismatch = typeof activityUnitId === "number" && typeof factorUnitId === "number" && activityUnitId !== factorUnitId;
  const isNotAvailable = co2eFactor !== null && isNaN(co2e);

  // Could abstracted as a util for use in every select cell
  const handleFactorSelected = async (emissionFactorId: number) => {
    setLoading(true);
    setOpen(false);
    try {
      await updateActvity(activityId, { emissionFactorId });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableCell>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {loading ? (
            <Skeleton className="h-6 w-full" />
          ) : (
            <Button
              variant="ghost"
              className={cn("w-full block whitespace-nowrap", {
                "pl-2 bg-destructive/10 hover:bg-destructive/25 text-destructive": isUnitMismatch,
                "bg-muted": isNotAvailable,
              })}
            >
              <HoverCard openDelay={500}>
                <HoverCardTrigger asChild>
                  <div className="flex gap-2 font-normal items-center">
                    {isNotAvailable && <ValueNoneIcon />}
                    {isUnitMismatch && <Badge variant="destructive">{unitAbbreviation}</Badge>}
                    <span className="flex-1 text-right">{factorId !== null ? (isNotAvailable ? "Not available" : co2e) : "Not selected"}</span>
                    <CaretSortIcon />
                  </div>
                </HoverCardTrigger>
                {factorId !== null && (
                  <HoverCardContent align="center" side="left" className="p-0 w-min">
                    <FactorInfoCard
                      emissionFactorId={factorId}
                      emissionFactorCategoryId={emissionFactorCategoryId!}
                      unit={{ abbreviation: unitAbbreviation || "", name: unitName || "" }}
                      co2e={co2e}
                      unitMatches={!isUnitMismatch}
                    />
                  </HoverCardContent>
                )}
              </HoverCard>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-[80vw] h-[90vh] flex flex-col gap-0 p-0">
          <FactorFinder
            units={units}
            emissionFactorSources={emissionFactorSources}
            emissionFactorYears={emissionFactorYears}
            defaultDescription={activityDescription || ""}
            defaultUnitIds={activityUnitId !== null ? [activityUnitId] : []}
            selectedFactor={
              factorId !== null
                ? {
                    categories: ["Test"],
                    unit: unitAbbreviation!,
                    year: factorYear!,
                    source: "DBEIS",
                    co2e: co2eFactor!,
                  }
                : undefined
            }
            onFactorSelected={(factor) => handleFactorSelected(factor.id)}
          />
        </DialogContent>
      </Dialog>
    </TableCell>
  );
};
