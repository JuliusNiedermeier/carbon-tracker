import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityHeaderContext } from "../../ClientActivityTable";
import { ColumnHeader } from "../../utils/ColumnHeader";

interface Props {
  ctx: ActivityHeaderContext<"amount">;
}

export const AmountHeader: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Amount" ctx={ctx} />
    </TableHead>
  );
};
