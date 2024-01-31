import { ComponentProps, FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { Checkbox } from "@/app/_components/ui/checkbox";

export const BiogenicShareCell: FC<ActivityCellContext<"biogenicShare">> = (props) => {
  const handleCheckedChange: ComponentProps<typeof Checkbox>["onCheckedChange"] = (checked) => {
    props.table.options.meta?.updateCell(props.row.original.id, "biogenicShare", !!checked);
  };

  return (
    <Cell width={props.column.getSize()}>
      <Checkbox checked={!!props.getValue()} onCheckedChange={handleCheckedChange} />
    </Cell>
  );
};