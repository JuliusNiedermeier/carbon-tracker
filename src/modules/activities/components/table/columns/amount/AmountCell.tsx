import { TableCell } from "@/common/components/ui/table";
import { ComponentProps, FC, useState } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { Input } from "@/common/components/ui/input";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { evaluateAmountFormula } from "@/modules/activities/utils/evaluate-amount-formula";
import { Popover, PopoverContent } from "@/common/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";

interface Props {
  ctx: ActivityCellContext<"amount">;
}

// const isFormula = (input: string) => parseFloat(input).toString() === input;

const validNumberRegex = /^(?!^[\.,])\d*(?:[,.]\d*)?$/;
const formulaRegex = /^[\d|\+\-\/\*\(\)\s\.\,]+$/;

const numberFormat = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const AmountCell: FC<Props> = ({ ctx }) => {
  const [numberInputValue, setNumberInputValueUnsafe] = useState(ctx.getValue()?.toString() || "");
  const [formulaInputValue, setFormulaInputValueUnsafe] = useState("");
  const [formulaEditorOpen, setFormulaEditorOpen] = useState(false);
  const [numberInputHasFocus, setNumberInputHasFocus] = useState(false);

  const parsedNumberInputValue = (() => {
    const value = parseFloat(numberInputValue.replace(",", "."));
    return isNaN(value) ? null : value;
  })();

  const formattedNumberInputValue = (() => {
    if (numberInputHasFocus || parsedNumberInputValue === null) return numberInputValue;
    return numberFormat.format(parsedNumberInputValue);
  })();

  const setNumberInputValue = (value: string) => {
    if (value === "" || validNumberRegex.test(value)) return setNumberInputValueUnsafe(value);

    // If the value is not a valid number, check if it is at least a valid formula
    // If it is a valid formula input should switch to popover
    const isValidFormulaInput = formulaRegex.test(value);
    if (isValidFormulaInput) {
      setFormulaInputValue(value);
      setFormulaEditorOpen(true);
    }
  };

  const setFormulaInputValue = (value: string) => {
    if (value === "" || formulaRegex.test(value)) return setFormulaInputValueUnsafe(value);
  };

  const handleNumberInputInput: ComponentProps<typeof Input>["onInput"] = (e) => setNumberInputValue(e.currentTarget.value);

  const handleFormulaInputInput: ComponentProps<typeof Input>["onInput"] = (e) => {
    setFormulaInputValue(e.currentTarget.value);
    const evaluatedFormula = evaluateAmountFormula(e.currentTarget.value);
    setNumberInputValue(evaluatedFormula === null ? "" : evaluatedFormula.toString());
  };

  const handleNumberInputFocus = () => {
    setNumberInputHasFocus(true);
  };

  const handleNumberInputBlur = () => {
    saveData(parsedNumberInputValue ? parsedNumberInputValue.toString() : null);
    setNumberInputHasFocus(false);
  };

  const handleFormulaInputFocus: ComponentProps<typeof Input>["onFocus"] = (e) => {
    // e.preventDefault();
    requestAnimationFrame(() => e.target.setSelectionRange(e.target.value.length, e.target.value.length));
  };

  const handleFormulaInputOpenChange: ComponentProps<typeof Popover>["onOpenChange"] = (open) => {
    if (open) return;
    setFormulaEditorOpen(false);
    setFormulaInputValue("");
  };

  const saveData = async (formula: string | null) => {
    try {
      await updateActvity(ctx.row.original.id, { amountFormula: formula });
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <TableCell key={ctx.cell.id}>
      <Popover open={formulaEditorOpen} onOpenChange={handleFormulaInputOpenChange}>
        <PopoverAnchor>
          <Input
            className="border-none text-right shadow-none w-24"
            placeholder="0.00"
            onFocus={handleNumberInputFocus}
            onBlur={handleNumberInputBlur}
            onInput={handleNumberInputInput}
            value={formattedNumberInputValue}
            disabled={formulaEditorOpen}
          />
        </PopoverAnchor>
        <PopoverContent className="p-0 border" side="top" align="end">
          <Input onInput={handleFormulaInputInput} onFocus={handleFormulaInputFocus} value={formulaInputValue} className="border-transparent text-right" />
        </PopoverContent>
      </Popover>
    </TableCell>
  );
};
