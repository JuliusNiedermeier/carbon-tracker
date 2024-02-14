import { EmissionFactorFinderDisplayHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../cell";
import { useFactorFinder } from "../../factor-finder";
import { numberFormat } from "@/app/_utils/number-formats";
import { cn } from "@/app/_utils/cn";
import { AlertTriangle } from "lucide-react";

export const CO2eFooter: FC<EmissionFactorFinderDisplayHeaderContext> = (props) => {
  const { selectedFactorInfo } = useFactorFinder();

  const isAvailable = typeof selectedFactorInfo?.co2e === "number" && !isNaN(selectedFactorInfo.co2e);

  return (
    <Cell
      width={props.column.getSize()}
      className={cn("flex justify-end items-center gap-2 text-foreground font-medium", { "text-muted-foreground font-normal text-orange-400": !isAvailable })}
    >
      {isAvailable ? numberFormat.format(selectedFactorInfo.co2e!) : "Missing"}
      {!isAvailable && <AlertTriangle size="16" />}
    </Cell>
  );
};
