import { FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { numberFormat } from "@/app/_utils/number-formats";

export const Co2eCell: FC<ActivityCellContext<"co2e">> = (props) => {
  const co2eFactor = props.row.original.factor?.co2e;
  const amount = props.row.original.amount;

  const hasFactor = typeof co2eFactor === "number";
  const hasAmount = typeof amount === "number";

  const emission = hasFactor && hasAmount && numberFormat.format(amount * co2eFactor);

  return (
    <Cell width={props.column.getSize()} className="justify-end">
      {emission}
    </Cell>
  );
};
