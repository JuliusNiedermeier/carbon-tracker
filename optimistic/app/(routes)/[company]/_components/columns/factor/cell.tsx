import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { FC, useState } from "react";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/_components/ui/hover-card";
import { FactorInfoCard } from "./info-card";
import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/app/_utils/cn";
import { ActivityCellContext } from "../../../_utils/cell-types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { AlertTriangle } from "lucide-react";
import { FactorFinder } from "../../factor-finder/factor-finder";

export const FactorCell: FC<ActivityCellContext<"factor.co2e">> = (props) => {
  const [open, setOpen] = useState(false);

  const co2e = parseFloat(props.getValue()?.toFixed(3) || "");

  const isUnitMismatch =
    typeof props.row.original.unitId === "number" &&
    typeof props.row.original.factor?.unitId === "number" &&
    props.row.original.unitId !== props.row.original.factor?.unitId;

  const isNotAvailable = props.getValue() !== undefined && isNaN(co2e);

  return (
    <Cell width={props.column.getSize()} padding={false}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={cn("w-full h-full block whitespace-nowrap px-3", { "bg-destructive/10 text-destructive": isUnitMismatch })}>
          <HoverCard openDelay={500}>
            <HoverCardTrigger asChild>
              <div className="flex h-full gap-2 font-normal items-center">
                {isNotAvailable && <AlertTriangle size="16" className="text-orange-400" />}
                {isUnitMismatch && <Badge variant="destructive">{props.row.original.factor?.unit.abbreviation}</Badge>}
                <span className="flex-1 text-right">{props.row.original.factor ? (isNotAvailable ? "Not available" : co2e) : "Not selected"}</span>
              </div>
            </HoverCardTrigger>
            {props.row.original.factor && (
              <HoverCardContent align="center" side="left" className="p-0 w-min">
                <FactorInfoCard
                  emissionFactorId={props.row.original.factor?.id!}
                  emissionFactorCategoryId={props.row.original.factor?.emissionFactorCategoryId!}
                  unit={props.row.original.factor?.unit!}
                  co2e={co2e}
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
