import { EmissionFactorFinderCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../cell";
import { numberFormat } from "@/app/_utils/number-formats";

export const CO2eCell: FC<EmissionFactorFinderCellContext<"co2e">> = (props) => {
  return (
    <Cell width={props.column.getSize()} className="flex-col justify-center items-end gap-1 text-foreground font-medium">
      {numberFormat.format(Number(props.getValue()))}
    </Cell>
  );
};
