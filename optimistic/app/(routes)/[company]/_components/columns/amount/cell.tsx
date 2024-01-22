import { ComponentProps, FC, useMemo, useRef, useState } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { InputCell } from "../../table-utils/cells/input-cell";
import { evaluate } from "mathjs";

export const AmountCell: FC<ActivityCellContext<"amount">> = (props) => {
  const [hasFocus, setHasFocus] = useState(false);

  // HACK
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleUpdate: ComponentProps<typeof InputCell>["onUpdate"] = (value) => {
    try {
      const result = evaluate(value) as number;
      if (typeof result !== "number") return;
      // The debounce logic must differentiate between update calls to different columns.
      // Currently the amountFormula update is canceled immediately by the amount update.
      // Possible the best way is to have seperate functions for updating each column.
      props.table.options.meta?.updateCell(props.row.original.id, "amountFormula", value);

      // HACK: Delay second update call by 100ms to prevent it from being canceled.
      if (updateTimeout.current) clearTimeout(updateTimeout.current);
      updateTimeout.current = setTimeout(() => props.table.options.meta?.updateCell(props.row.original.id, "amount", result.toString()), 1500);
    } catch {}
    // props.table.options.meta?.updateCell(props.row.original.id, "amount", value);
  };

  // const result = useMemo(() => {});

  const displayedValue = hasFocus ? props.row.original.amountFormula : props.getValue()?.toString();

  return <InputCell value={displayedValue || ""} onUpdate={handleUpdate} onFocus={() => setHasFocus(true)} onBlur={() => setHasFocus(false)} />;
};
