import { TableCell } from "@/common/components/ui/table";
import { FC, FocusEventHandler, useState } from "react";
import { ActivityCellContext } from "@/modules/activities/components/table/ActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Input } from "@/common/components/ui/input";

interface Props {
  ctx: ActivityCellContext<"year">;
}

const EMPTY = "empty";

export const YearCell: FC<Props> = ({ ctx }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(ctx.getValue()?.toString());

  // Could abstracted as a util for use in every select cell
  const handleValueChange: FocusEventHandler<HTMLInputElement> = async (e) => {
    const year = parseFloat(value!);

    if (value !== "" && (isNaN(year) || ctx.getValue() === year)) return;

    try {
      // await updateActvity(ctx.row.original.id, { year: isNaN(year) ? null : year });
      await updateActvity(ctx.row.original.id, { year: isNaN(year) ? null : year });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableCell key={ctx.cell.id} className="max-w-[20rem] overflow-hidden text-ellipsis">
      <Input
        className="border-none shadow-none"
        placeholder="Year"
        onBlur={handleValueChange}
        onInput={(e) => setValue(e.currentTarget.value)}
        value={value}
      />
    </TableCell>
  );
};
