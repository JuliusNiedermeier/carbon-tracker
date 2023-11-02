import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityHeaderContext } from "../../ActivityTable";
import { ColumnHeader } from "../../utils/ColumnHeader";

interface Props {
  ctx: ActivityHeaderContext<"notes">;
}

export const Header: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Notes" ctx={ctx} />
    </TableHead>
  );
};
