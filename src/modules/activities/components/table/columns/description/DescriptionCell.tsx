import { TableCell } from "@/common/components/ui/table";
import { ChangeEventHandler, FC, FocusEventHandler, useState } from "react";
import { ActivityCellContext, TableOptionsMeta } from "../../ActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Input } from "@/common/components/ui/input";

interface Props {
  ctx: ActivityCellContext<"description">;
}

export const DescriptionCell: FC<Props> = ({ ctx }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(ctx.getValue());

  const handleValueChange: FocusEventHandler<HTMLInputElement> = async (e) => {
    if (ctx.getValue() === value) return;
    try {
      await updateActvity(ctx.row.original.id, { description: e.currentTarget.value });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    (ctx.table.options.meta as TableOptionsMeta).update(ctx.row.index, ctx.column.id, e.currentTarget.value);
  };

  return (
    <TableCell key={ctx.cell.id} className="max-w-[20rem] overflow-hidden text-ellipsis">
      <Input
        className="border-none shadow-none"
        placeholder="No description"
        // onBlur={handleValueChange}
        // onInput={(e) => setValue(e.currentTarget.value)}
        onChange={handleChange}
        value={ctx.getValue()}
      />
    </TableCell>
  );
};
