import { TableCell } from "@/common/components/ui/table";
import { FC, FocusEventHandler, useState } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { Input } from "@/common/components/ui/input";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { numberFormat } from "@/common/numberFormats";

interface Props {
  ctx: ActivityCellContext<"amount">;
}

export const AmountCell: FC<Props> = ({ ctx }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(ctx.getValue()?.toString() || '');

  const handleValueChange: FocusEventHandler<HTMLInputElement> = async (e) => {
    const amount = parseFloat(value!);

    if (value !== "" && (isNaN(amount) || ctx.getValue() === amount)) return;

    try {
      await updateActvity(ctx.row.original.id, { amount: isNaN(amount) ? null : amount });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableCell key={ctx.cell.id}>
      <Input
        className="border-none text-right shadow-none w-24"
        placeholder="0.00"
        onBlur={handleValueChange}
        onInput={(e) => setValue(e.currentTarget.value)}
        value={numberFormat.format(value as unknown as number)}
      />
    </TableCell>
  );
};
