import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { MinusIcon } from "@radix-ui/react-icons";

interface Props {
  ctx: ActivityCellContext<"amount">;
}

export const EmissionCell: FC<Props> = ({ ctx }) => {
  return (
    <TableCell key={ctx.cell.id} className="font-bold text-right">
      {typeof ctx.getValue() === "number" ? ctx.getValue()!.toFixed(2) : <MinusIcon className="ml-auto" />}
    </TableCell>
  );
};
