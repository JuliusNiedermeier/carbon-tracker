import { EmissionFactorFinderCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../cell";
import { numberFormat } from "@/app/_utils/number-formats";
import { cn } from "@/app/_utils/cn";
import { AlertTriangle } from "lucide-react";

export const CO2eCell: FC<EmissionFactorFinderCellContext<"co2e">> = (props) => {
  const isAvailable = typeof props.getValue() === "number" && !isNaN(props.getValue()!);

  return (
    <Cell
      width={props.column.getSize()}
      className={cn("flex justify-end items-center gap-2 text-foreground font-medium", { "text-muted-foreground font-normal text-orange-400": !isAvailable })}
    >
      {isAvailable ? numberFormat.format(Number(props.getValue())) : "Missing"}
      {!isAvailable && <AlertTriangle size="16" />}
    </Cell>
  );
};
