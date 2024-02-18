import { ComponentProps, FC, useEffect, useState } from "react";
import { TransitionInput } from "../../../../../_components/transition-input";
import { evaluate } from "mathjs";
import { FunctionSquare, X } from "lucide-react";
import { Cell } from "../../cell";
import { numberFormat } from "@/app/_utils/number-formats";
import { cn } from "@/app/_utils/cn";

export type Props = {
  width: number;
  formula: string | null;
  value: number | null;
  onUpdate: (value: number | null, formula: string | null) => any;
};

export const AmountBaseCell: FC<Props> = (props) => {
  const [hasFocus, setHasFocus] = useState(false);

  const isFormula = (props.value?.toString() ?? null) !== props.formula;
  const isInvalid = props.value === null && props.formula !== null;

  const handleUpdate: ComponentProps<typeof TransitionInput>["onInput"] = (formula) => {
    props.onUpdate(evaluateFormula(formula), formula || null);
  };

  const displayedValue = hasFocus ? props.formula : props.value ? numberFormat.format(props.value) : null;

  return (
    <Cell padding={false} className={cn("items-stretch group", { "!bg-destructive/10 !text-destructive": isInvalid })} width={props.width}>
      {isFormula && (
        <div className="absolute left-0 top-0 bottom-0 m-2 bg-inherit opacity-25 group-focus-within:opacity-100 rounded aspect-square grid place-content-center pointer-events-none">
          <FunctionSquare size="16" />
        </div>
      )}
      <TransitionInput
        className="text-right h-full px-3 outline-none flex-1 bg-transparent"
        value={displayedValue || ""}
        onInput={handleUpdate}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        spellCheck={false}
      />
      {isFormula && hasFocus && (
        <div className={cn("pr-3 h-full grid place-content-center", { "text-red-500": isInvalid })}>{isInvalid ? <X size="16" /> : `= ${props.value}`}</div>
      )}
    </Cell>
  );
};
