import { FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { numberFormat } from "@/app/_utils/number-formats";

export const Co2eCell: FC<ActivityCellContext<"co2e">> = (props) => {
  return (
    <Cell width={props.column.getSize()} className="justify-end">
      {props.getValue() !== null && numberFormat.format(props.getValue()!)}
    </Cell>
  );
};
