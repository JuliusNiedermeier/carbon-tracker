import { ComponentProps, FC } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { TransitionInput } from "../../../../../_components/transition-input";
import { Cell } from "../../cell";

export const DescriptionCell: FC<ActivityCellContext<"description">> = (props) => {
  const handleUpdate: ComponentProps<typeof TransitionInput>["onInput"] = (value) => {
    props.table.options.meta?.updateCell(props.row.original.id, "description", value);
  };
  return (
    <Cell padding={false} className="items-stretch" width={props.column.getSize()}>
      <TransitionInput value={props.getValue()} onInput={handleUpdate} className="bg-transparent outline-none px-3 w-full" />
    </Cell>
  );
};
