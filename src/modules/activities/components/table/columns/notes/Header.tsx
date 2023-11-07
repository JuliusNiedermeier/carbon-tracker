import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityHeaderContext } from "@/modules/activities/components/table/ActivityTable";
import { ColumnHeader } from "@/modules/activities/components/table/utils/ColumnHeader";

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
