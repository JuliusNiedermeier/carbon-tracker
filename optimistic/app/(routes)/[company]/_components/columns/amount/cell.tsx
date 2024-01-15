import { ComponentProps, FC } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { InputCell } from "../../table-utils/cells/input-cell";

export const AmountCell: FC<ActivityCellContext<"amount">> = (props) => {
  const handleUpdate: ComponentProps<typeof InputCell>["onUpdate"] = (value) => {
    props.table.options.meta?.updateCell(props.row.original.id, "amount", value);
  };

  return <InputCell value={props.getValue()?.toString() || ""} onUpdate={handleUpdate} />;
};
