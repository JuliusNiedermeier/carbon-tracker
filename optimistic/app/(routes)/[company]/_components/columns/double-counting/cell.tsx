import { FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { Checkbox } from "@/app/_components/ui/checkbox";

export const DoubleCountingCell: FC<ActivityCellContext<"doubleCounting">> = (props) => {
  return (
    <Cell width={props.column.getSize()}>
      <Checkbox></Checkbox>
    </Cell>
  );
};
