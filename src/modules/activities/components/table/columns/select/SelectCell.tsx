import { Checkbox } from "@/common/components/ui/checkbox";
import { TableCell } from "@/common/components/ui/table";
import { ComponentProps, FC, useMemo } from "react";
import { ActivityDisplayCellContext } from "@/modules/activities/components/table/ActivityTable";
import { useMemoComponent } from "@/modules/activities/utils/use-memo-component";

type Props = {
  ctx: ActivityDisplayCellContext;
};

export const SelectCell: FC<Props> = ({ ctx }) => {
  // This will still rerender every time a new context is passed
  // Must be fixed
  const handleOnCheckedChange = useMemo(() => ctx.row.getToggleSelectedHandler(), [ctx.row]);

  const Component = useMemoComponent(_SelectCell);
  return <Component checked={ctx.row.getIsSelected()} onCheckedChange={handleOnCheckedChange} />;
};

type _Props = {
  checked: boolean;
  onCheckedChange: ComponentProps<typeof Checkbox>["onCheckedChange"];
};

const _SelectCell: FC<_Props> = ({ checked, onCheckedChange }) => {
  return (
    <TableCell key="select-cell">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
    </TableCell>
  );
};
