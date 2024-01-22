import { FC } from "react";
import { ActivityDisplayHeaderContext, ActivityHeaderContext } from "../../../_utils/cell-types";
import { Checkbox } from "@/app/_components/ui/checkbox";

export const SelectHeader: FC<ActivityDisplayHeaderContext> = (props) => {
  return (
    <div className="header">
      <Checkbox
        checked={props.table.getIsSomeRowsSelected() ? "indeterminate" : props.table.getIsAllRowsSelected()}
        onCheckedChange={(checked) => props.table.toggleAllRowsSelected(!!checked)}
      />
    </div>
  );
};
