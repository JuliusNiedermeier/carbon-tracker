import { TableCell } from "@/common/components/ui/table";
import { ComponentProps, FC, useState } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { Input } from "@/common/components/ui/input";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { evaluateAmountFormula } from "@/modules/activities/utils/evaluate-amount-formula";
import { Badge } from "@/common/components/ui/badge";

interface Props {
  ctx: ActivityCellContext<"amount">;
}

const numberFormatShort = new Intl.NumberFormat("de-DE", { maximumSignificantDigits: 2 });
const numberFormatLong = new Intl.NumberFormat("de-DE", { maximumSignificantDigits: 20 });

export const AmountCell: FC<Props> = ({ ctx }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(ctx.getValue()?.toString());
  const [evaluatedValue, setEvaluatedValue] = useState<number | null>(null);
  const [hasFocus, setHasFocus] = useState(false);

  const formatedValue = hasFocus ? numberFormatLong.format(parseFloat(value!)) : numberFormatShort.format(parseFloat(value!));

  const handleFocus = () => {
    setValue(ctx.row.original.amountFormula || "");
    setHasFocus(true);
  };

  const handleBlur = () => {
    saveData(value);
    setValue(ctx.getValue()?.toString());
    setHasFocus(false);
  };

  const saveData = async (formula?: string) => {
    try {
      await updateActvity(ctx.row.original.id, { amountFormula: formula });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInput: ComponentProps<typeof Input>["onInput"] = (e) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);
    setEvaluatedValue(evaluateAmountFormula(newValue));
  };

  return (
    <TableCell key={ctx.cell.id}>
      <div className="relative">
        <Input
          className="border-none text-right shadow-none w-24"
          placeholder="0.00"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          value={formatedValue}
        />
        {hasFocus && (
          <Badge variant="secondary" className="mt-2 w-full justify-end">
            {evaluatedValue || "-"}
          </Badge>
        )}
      </div>
    </TableCell>
  );
};
