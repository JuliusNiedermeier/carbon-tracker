import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ColumnHeader } from "../../utils/ColumnHeader";
import { ActivityHeaderContext } from "../../ActivityTable";

interface Props {
  ctx: ActivityHeaderContext<"year">;
}

export const YearHeader: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Year" ctx={ctx} />
    </TableHead>
  );
};
