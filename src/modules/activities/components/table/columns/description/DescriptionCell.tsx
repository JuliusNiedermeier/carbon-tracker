import { TableCell } from "@/common/components/ui/table";
import { FC, FocusEventHandler, useState } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Input } from "@/common/components/ui/input";
import { useMemoComponent } from "@/modules/activities/utils/use-memo-component";

interface Props {
  ctx: ActivityCellContext<"description">;
}

export const DescriptionCell: FC<Props> = ({ ctx }) => {
  const Component = useMemoComponent(_DescriptionCell);
  return <Component activityId={ctx.row.original.id} cellId={ctx.cell.id} description={ctx.getValue()} />;
};

type _Props = {
  description: string;
  cellId: string;
  activityId: number;
};

const _DescriptionCell: FC<_Props> = ({ description: initialDescription, cellId, activityId }) => {
  const [description, setDescription] = useState(initialDescription);

  const handleValueChange: FocusEventHandler<HTMLInputElement> = (e) => {
    if (initialDescription === description) return;
    updateActvity(activityId, { description: e.currentTarget.value });
  };

  return (
    <TableCell key={cellId} className="max-w-[20rem] overflow-hidden text-ellipsis">
      <Input
        className="border-none shadow-none"
        placeholder="No description"
        onBlur={handleValueChange}
        onInput={(e) => setDescription(e.currentTarget.value)}
        value={description}
      />
    </TableCell>
  );
};
