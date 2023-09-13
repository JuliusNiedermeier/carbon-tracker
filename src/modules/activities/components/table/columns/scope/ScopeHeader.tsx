import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ColumnHeader } from "../../utils/ColumnHeader";
import { JoinedActivity } from "../../ActivityTable";
import { HeaderContext } from "@tanstack/react-table";

interface Props {
  ctx: HeaderContext<JoinedActivity, number | null>;
}

export const ScopeHeader: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Scope" ctx={ctx} />
    </TableHead>
  );
};
