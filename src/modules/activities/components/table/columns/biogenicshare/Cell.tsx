import { Checkbox } from "@/common/components/ui/checkbox";
import { TableCell } from "@/common/components/ui/table";
import { FC, ComponentProps } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";

interface Props {
  ctx: ActivityCellContext<"biogenicShare">;
}

export const Cell: FC<Props> = ({ ctx }) => {
  const getIsSelected = ctx.getValue() || false;
  const handleValueChange: ComponentProps<typeof Checkbox>["onCheckedChange"] = async (value) => {

    try {
      await updateActvity(ctx.row.original.id, { biogenicShare: value == "indeterminate" ? false : value });
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <TableCell key={ctx.cell.id}>
      <Checkbox
      onCheckedChange={handleValueChange}
      checked={getIsSelected}
      />
    </TableCell>
  );
};
