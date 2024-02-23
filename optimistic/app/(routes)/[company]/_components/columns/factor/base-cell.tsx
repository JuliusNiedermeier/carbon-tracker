import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ComponentProps, FC, useState } from "react";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/_components/ui/hover-card";
import { FactorInfoCard } from "./info-card";
import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/app/_utils/cn";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FactorFinder } from "../../factor-finder/factor-finder";
import { EmissionFactorValue } from "./emission-factor-value";
import { useUnits } from "../../../_hooks/use-units";

export type Props = {
  width: number;
  pinned: ComponentProps<typeof Cell>["pinned"];
  start: ComponentProps<typeof Cell>["start"];
  co2e?: number | null;
  factorUnitID?: number | null;
  amountUnitID?: number | null;
  factorFinder: {
    onSelect: ComponentProps<typeof FactorFinder>["onSelect"];
    emissionFactorID: number | null;
    initialFilters?: { searchTerm?: string | null; amountUnitID?: number | null };
  };
};

export const FactorBaseCell: FC<Props> = (props) => {
  const units = useUnits();

  const [open, setOpen] = useState(false);

  const isUnitMismatch = typeof props.amountUnitID === "number" && typeof props.factorUnitID === "number" && props.amountUnitID !== props.factorUnitID;

  return (
    <Cell width={props.width} padding={false} pinned={props.pinned} start={props.start}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={cn("w-full h-full block whitespace-nowrap px-3", { "bg-destructive/10 text-destructive": isUnitMismatch })}>
          <HoverCard openDelay={500}>
            <HoverCardTrigger asChild>
              <div className={cn("flex h-full gap-2 items-center")}>
                {isUnitMismatch && <Badge variant="destructive">{units.find((unit) => unit.id === props.factorUnitID)?.abbreviation}</Badge>}
                {props.co2e !== undefined && <EmissionFactorValue value={props.co2e} className="ml-auto" />}
              </div>
            </HoverCardTrigger>
            {props.factorFinder.emissionFactorID && (
              <HoverCardContent align="center" side="left" className="p-0 w-min">
                <FactorInfoCard emissionFactorId={props.factorFinder.emissionFactorID} />
              </HoverCardContent>
            )}
          </HoverCard>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col gap-0 p-0 border-none overflow-hidden" showCloseButton={false}>
          <FactorFinder
            onSelect={props.factorFinder.onSelect}
            selectedFactorID={props.factorFinder.emissionFactorID}
            initialSearchTerm={props.factorFinder.initialFilters?.searchTerm || ""}
            initialUnitID={props.factorFinder.initialFilters?.amountUnitID}
          />
        </DialogContent>
      </Dialog>
    </Cell>
  );
};
