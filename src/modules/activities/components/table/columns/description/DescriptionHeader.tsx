import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityHeaderContext } from "../../ClientActivityTable";
import { ColumnHeader } from "../../utils/ColumnHeader";

interface Props {
  ctx: ActivityHeaderContext<"description">;
}

export const DescriptionHeader: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Description" ctx={ctx} />
    </TableHead>
  );
};
