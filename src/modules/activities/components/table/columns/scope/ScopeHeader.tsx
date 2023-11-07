import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ColumnHeader } from "@/modules/activities/components/table/utils/ColumnHeader";
import { HeaderContext } from "@tanstack/react-table";
import { ActivityTableData } from "@/modules/activities/components/table/ActivityTable";


interface Props {
  ctx: HeaderContext<ActivityTableData, string | null>;
}

export const ScopeHeader: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Scope" ctx={ctx} />
    </TableHead>
  );
};
