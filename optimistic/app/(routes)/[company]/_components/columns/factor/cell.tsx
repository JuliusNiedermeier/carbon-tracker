import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { FC, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/_components/ui/hover-card";
import { FactorInfoCard } from "./info-card";
import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/app/_utils/cn";
import { ActivityCellContext } from "../../../_utils/cell-types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { AlertTriangle } from "lucide-react";
import { FactorFinder } from "../../factor-finder/factor-finder";
import { numberFormat } from "@/app/_utils/number-formats";

export const FactorCell: FC<ActivityCellContext<"factor.co2e">> = (props) => {
  const [open, setOpen] = useState(false);

  const value = props.getValue();

  const isSelected = props.row.original.emissionFactorId !== null;
  const isMissingValue = isSelected && (value === null || isNaN(value));

  const safeValue = !isSelected || isMissingValue ? null : value;

  const formattedValue = useMemo(() => {
    if (!isSelected || isMissingValue) return null;
    return numberFormat.format(props.getValue()!);
  }, [props.getValue, isSelected, isMissingValue]);

  const isUnitMismatch =
    typeof props.row.original.unitId === "number" &&
    typeof props.row.original.factor?.unitId === "number" &&
    props.row.original.unitId !== props.row.original.factor?.unitId;

  return (
    <Cell width={props.column.getSize()} padding={false}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={cn("w-full h-full block whitespace-nowrap px-3", { "bg-destructive/10 text-destructive": isUnitMismatch })}>
          <HoverCard openDelay={500}>
            <HoverCardTrigger asChild>
              <div className={cn("flex h-full gap-2 font-normal items-center", { "text-orange-400": isMissingValue })}>
                {isUnitMismatch && <Badge variant="destructive">{props.row.original.factor?.unit.abbreviation}</Badge>}
                <span className="flex-1 text-right">{isMissingValue ? "Missing" : formattedValue}</span>
                {isMissingValue && <AlertTriangle size="16" />}
              </div>
            </HoverCardTrigger>
            {props.row.original.factor && (
              <HoverCardContent align="center" side="left" className="p-0 w-min">
                <FactorInfoCard
                  emissionFactorId={props.row.original.factor?.id!}
                  emissionFactorCategoryId={props.row.original.factor?.emissionFactorCategoryId!}
                  unit={props.row.original.factor?.unit!}
                  co2e={safeValue}
                  unitMatches={!isUnitMismatch}
                />
              </HoverCardContent>
            )}
          </HoverCard>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col gap-0 p-0 border-none overflow-hidden" showCloseButton={false}>
          <FactorFinder
            activityID={props.row.original.id}
            selectedFactorID={props.row.original.emissionFactorId}
            initialSearchTerm={props.row.original.description}
            initialUnitID={props.row.original.unitId}
          />
        </DialogContent>
      </Dialog>
    </Cell>
  );
};
