import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ColumnHeader } from "../../utils/ColumnHeader";
import { ActivityHeaderContext } from "../../ActivityTable";

interface Props {
  ctx: ActivityHeaderContext<"responsibility">;
}

export const ResponsibilityHeader: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Responsibility" ctx={ctx} />
    </TableHead>
  );
};
