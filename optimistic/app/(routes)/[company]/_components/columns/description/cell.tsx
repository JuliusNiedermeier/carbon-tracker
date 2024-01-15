import { ComponentProps, FC } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { InputCell } from "../../table-utils/cells/input-cell";

export const DescriptionCell: FC<ActivityCellContext<"description">> = (props) => {
  const handleUpdate: ComponentProps<typeof InputCell>["onUpdate"] = (value) => {
    props.table.options.meta?.updateCell(props.row.original.id, "description", value);
  };
  return <InputCell value={props.getValue()} onUpdate={handleUpdate} />;
};
