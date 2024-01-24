import { FC } from "react";
import { ActivityDisplayHeaderContext } from "../../../_utils/cell-types";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Cell } from "../../cell";

export const SelectHeader: FC<ActivityDisplayHeaderContext> = (props) => {
  return (
    <Cell width={props.header.getSize()}>
      <Checkbox
        checked={props.table.getIsSomeRowsSelected() ? "indeterminate" : props.table.getIsAllRowsSelected()}
        onCheckedChange={(checked) => props.table.toggleAllRowsSelected(!!checked)}
      />
    </Cell>
  );
};
