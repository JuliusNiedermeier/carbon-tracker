import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityCellContext } from "@/modules/activities/components/table//ActivityTable";
import { MinusIcon } from "@radix-ui/react-icons";
import { numberFormat } from "@/common/numberFormats";

interface Props {
  ctx: ActivityCellContext<"amount">;
}

export const EmissionCell: FC<Props> = ({ ctx }) => {
  return (
    <TableCell key={ctx.cell.id} className="font-bold text-right">
      {typeof ctx.getValue() === "number" ? numberFormat.format(ctx.getValue()!) : <MinusIcon className="ml-auto" />}
    </TableCell>
  );
};
