import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";
import { ColumnHeader } from "@/modules/activities/components/table/utils/ColumnHeader";
import { ActivityHeaderContext } from "@/modules/activities/components/table/ActivityTable";


interface Props {
  ctx: ActivityHeaderContext<"unit.abbreviation">;
}

export const UnitHeader: FC<Props> = ({ ctx }) => {
  return (
    <TableHead>
      <ColumnHeader name="Unit" ctx={ctx} />
    </TableHead>
  );
};
