import { TableCell } from "@/common/components/ui/table";
import { ComponentProps, FC, useState } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { useMemoComponent } from "@/modules/activities/utils/use-memo-component";
import { FormattedNumberInput } from "@/common/components/FormattedNumberInput";

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
  const [amount, setAmount] = useState(initialAmount);

  const handleBlur: ComponentProps<typeof FormattedNumberInput>["onBlur"] = async () => {
    if (amount === initialAmount) return;
    await updateActvity(activityId, { amount: amount });
  };

  const handleValidInput: ComponentProps<typeof FormattedNumberInput>["onValidInput"] = async (newAmount) => {
    setAmount(newAmount);
  };

  return (
    <TableCell key={cellId}>
      <FormattedNumberInput className="border-none shadow-none" value={amount} onValidInput={handleValidInput} onBlur={handleBlur} />
    </TableCell>
  );
};
