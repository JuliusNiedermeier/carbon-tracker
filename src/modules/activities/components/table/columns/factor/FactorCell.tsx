import { TableCell } from "@/common/components/ui/table";
import { FC, useState } from "react";
import { ActivityCellContext } from "../../ClientActivityTable";
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

interface Props {
  ctx: ActivityCellContext<"factor.co2e">;
  units: UnitSelect[];
  emissionFactorSources: EmissionFactorSourceSelect[];
  emissionFactorYears: number[];
}

export const FactorCell: FC<Props> = ({ ctx, units, emissionFactorSources, emissionFactorYears }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const co2e = parseFloat(ctx.getValue()?.toFixed(3));

  const isUnitMismatch =
    typeof ctx.row.original.unitId === "number" &&
    typeof ctx.row.original.factor?.unitId === "number" &&
    ctx.row.original.unitId !== ctx.row.original.factor?.unitId;

  const isNotAvailable = ctx.getValue() !== undefined && isNaN(co2e);

  // Could abstracted as a util for use in every select cell
  const handleFactorSelected = async (emissionFactorId: number) => {
    setLoading(true);
    setOpen(false);
    try {
      await updateActvity(ctx.row.original.id, { emissionFactorId });
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
              className={cn("w-full block", { "pl-2 bg-destructive/10 hover:bg-destructive/25 text-destructive": isUnitMismatch, "bg-muted": isNotAvailable })}
            >
              <HoverCard openDelay={500}>
                <HoverCardTrigger asChild>
                  <div className="flex gap-2 font-normal items-center">
                    {isNotAvailable && <ValueNoneIcon />}
                    {isUnitMismatch && <Badge variant="destructive">{ctx.row.original.factor?.unit.abbreviation}</Badge>}
                    <span className="flex-1 text-right">{ctx.row.original.factor ? (isNotAvailable ? "Not available" : co2e) : "Not selected"}</span>
                    <CaretSortIcon />
                  </div>
                </HoverCardTrigger>
                {ctx.row.original.factor && (
                  <HoverCardContent align="center" side="left" className="p-0 w-min">
                    <FactorInfoCard
                      emissionFactorId={ctx.row.original.factor?.id!}
                      emissionFactorCategoryId={ctx.row.original.factor?.emissionFactorCategoryId!}
                      unit={ctx.row.original.factor?.unit!}
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
            defaultDescription={ctx.row.original.description}
            defaultUnitIds={ctx.row.original.unit?.id ? [ctx.row.original.unit?.id] : []}
            selectedFactor={
              ctx.row.original.factor
                ? {
                    categories: ["Test"],
                    unit: ctx.row.original.factor.unit.abbreviation,
                    year: ctx.row.original.factor.year,
                    source: "DBEIS",
                    co2e: ctx.row.original.factor.co2e,
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
