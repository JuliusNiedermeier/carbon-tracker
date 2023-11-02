import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ColumnHeader } from "@/modules/activities/components/table/utils/ColumnHeader";
import { ActivityHeaderContext } from "@/modules/activities/components/table/ActivityTable";

interface Props {
  ctx: ActivityHeaderContext<"biogenicShare">;
}

export const Header: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Biogenic Share" ctx={ctx} />
    </TableHead>
  );
};
