import { FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { Checkbox } from "@/app/_components/ui/checkbox";

export const BiogenicShareCell: FC<ActivityCellContext<"biogenicShare">> = (props) => {
  return (
    <Cell width={props.column.getSize()}>
      <Checkbox></Checkbox>
    </Cell>
  );
};
