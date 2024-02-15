import { ComponentProps, FC, useRef } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { useActivityGrid } from "../../providers/activity-grid-provider";
import { AmountBaseCell } from "./base-cell";

export const AmountCell: FC<ActivityCellContext<"amount">> = (props) => {
  const { updateCell } = useActivityGrid();

  // HACK
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleUpdate: ComponentProps<typeof AmountBaseCell>["onUpdate"] = (value, formula) => {
    // The debounce logic must differentiate between update calls to different columns.
    // Currently the amountFormula update is canceled immediately by the amount update.
    // Possible the best way is to have seperate functions for updating each column.
    updateCell(props.row.original.id, "amountFormula", formula);

    // HACK: Delay second update call by 100ms to prevent it from being canceled.
    if (updateTimeout.current) clearTimeout(updateTimeout.current);
    updateTimeout.current = setTimeout(() => updateCell(props.row.original.id, "amount", value), 1500);
  };

  return <AmountBaseCell width={props.column.getSize()} value={props.getValue()} formula={props.row.original.amountFormula} onUpdate={handleUpdate} />;
};
