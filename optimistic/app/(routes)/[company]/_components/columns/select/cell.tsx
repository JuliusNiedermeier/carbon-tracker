import { FC } from "react";
import { BaseCell } from "@/app/(routes)/[company]/_components/table-utils/cells/base-cell";
import { ActivityCellContext, ActivityDisplayCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { Checkbox } from "@/app/_components/ui/checkbox";

export const SelectCell: FC<ActivityDisplayCellContext> = (props) => {
  return (
    <BaseCell>
      <Checkbox></Checkbox>
    </BaseCell>
  );
};
