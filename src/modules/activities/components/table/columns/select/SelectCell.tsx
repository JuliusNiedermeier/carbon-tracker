import { Checkbox } from "@/common/components/ui/checkbox";
import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityDisplayCellContext } from "../../ActivityTable";

interface Props {
  ctx: ActivityDisplayCellContext;
}

export const SelectCell: FC<Props> = ({ ctx }) => {
  return (
    <TableCell key="select-cell">
      <Checkbox checked={ctx.row.getIsSelected()} onCheckedChange={ctx.row.getToggleSelectedHandler()} />
    </TableCell>
  );
};
