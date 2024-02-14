import { ComponentProps, FC, useRef, useState } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { TransitionInput } from "../../../../../_components/transition-input";
import { evaluate } from "mathjs";
import { FunctionSquare } from "lucide-react";
import { Cell } from "../../cell";
import { useActivityGrid } from "../../providers/activity-grid-provider";
import { numberFormat } from "@/app/_utils/number-formats";

export const AmountCell: FC<ActivityCellContext<"amount">> = (props) => {
  const { updateCell } = useActivityGrid();

  const [hasFocus, setHasFocus] = useState(false);

  const isFormula = props.row.original.amount?.toString() !== props.row.original.amountFormula;

  // HACK
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleUpdate: ComponentProps<typeof TransitionInput>["onInput"] = (value) => {
    try {
      const result = evaluate(value) as number;
      if (typeof result !== "number") return;
      // The debounce logic must differentiate between update calls to different columns.
      // Currently the amountFormula update is canceled immediately by the amount update.
      // Possible the best way is to have seperate functions for updating each column.
      updateCell(props.row.original.id, "amountFormula", value);

      // HACK: Delay second update call by 100ms to prevent it from being canceled.
      if (updateTimeout.current) clearTimeout(updateTimeout.current);
      updateTimeout.current = setTimeout(() => updateCell(props.row.original.id, "amount", result), 1500);
    } catch {}
    // updateCell(props.row.original.id, "amount", value);
  };

  const displayedValue = hasFocus ? props.row.original.amountFormula : props.getValue() ? numberFormat.format(props.getValue()!) : null;

  return (
    <Cell padding={false} className="items-stretch group" width={props.column.getSize()}>
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
      {isFormula && hasFocus && <div className="px-3 grid place-content-center bg-gray-100 text-sm">{props.row.original.amount}</div>}
    </Cell>
  );
};
