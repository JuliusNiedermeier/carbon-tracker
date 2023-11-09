import { TableCell } from "@/common/components/ui/table";
import { ComponentProps, FC, FocusEventHandler, useState } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { Input } from "@/common/components/ui/input";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { useMemoComponent } from "@/modules/activities/utils/use-memo-component";
import { numberFormat } from "@/common/numberFormats";

interface Props {
  ctx: ActivityCellContext<"amount">;
}

export const AmountCell: FC<Props> = ({ ctx }) => {
  const Component = useMemoComponent(_AmountCell);
  return <Component amount={ctx.getValue()} activityId={ctx.row.original.id} cellId={ctx.cell.id} />;
};

type _Props = {
  amount: number | null;
  activityId: number;
  cellId: string;
};

export const _AmountCell: FC<_Props> = ({ amount: initialAmount, activityId, cellId }) => {
  const [amount, setAmount] = useState(initialAmount?.toString());

  const handleInput: ComponentProps<typeof Input>["onInput"] = (e) => {
    setAmount(e.currentTarget.value);
  };

  const handleValueChange: FocusEventHandler<HTMLInputElement> = async (e) => {
    if (amount === initialAmount?.toString()) return;
    const amountNumber = parseFloat(amount!);
    const isValidNumber = !isNaN(amountNumber);
    if (amount !== "" && !isValidNumber) return;
    await updateActvity(activityId, { amount: isValidNumber ? amountNumber : null });
  };

  return (
    <TableCell key={cellId}>
      <Input
        className="border-none text-right shadow-none w-24"
        placeholder="0.00"
        onBlur={handleValueChange}
        onInput={handleInput}
        value={numberFormat.format(amount as unknown as number)}
      />
    </TableCell>
  );
};
