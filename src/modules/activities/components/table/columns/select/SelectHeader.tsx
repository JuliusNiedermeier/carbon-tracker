import { Checkbox } from "@/common/components/ui/checkbox";
import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityDisplayHeaderContext } from "../../ActivityTable";

interface Props {
  ctx: ActivityDisplayHeaderContext;
}

export const SelectHeader: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <Checkbox checked={ctx.table.getIsAllRowsSelected()} onCheckedChange={(checked) => ctx.table.toggleAllPageRowsSelected(checked as boolean)} />
    </TableHead>
  );
};
