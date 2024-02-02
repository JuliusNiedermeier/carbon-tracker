import { ComponentProps, FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { useActivityGrid } from "../../providers/activity-grid-provider";

export const DoubleCountingCell: FC<ActivityCellContext<"doubleCounting">> = (props) => {
  const { updateCell } = useActivityGrid();

  const handleCheckedChange: ComponentProps<typeof Checkbox>["onCheckedChange"] = (checked) => {
    updateCell(props.row.original.id, "doubleCounting", !!checked);
  };

  return (
    <Cell width={props.column.getSize()}>
      <Checkbox checked={!!props.getValue()} onCheckedChange={handleCheckedChange} />
    </Cell>
  );
};
