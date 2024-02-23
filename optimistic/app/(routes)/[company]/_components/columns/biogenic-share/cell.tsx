import { ComponentProps, FC } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { useActivityGrid } from "../../providers/activity-grid-provider";
import { SelectCell } from "../../table-utils/cells/select-cell";

const options = [
  { value: "true", component: <span className="block text-left">Yes</span> },
  { value: "false", component: <span className="block text-left">No</span> },
] as const satisfies ComponentProps<typeof SelectCell>["options"];

export const BiogenicShareCell: FC<ActivityCellContext<"biogenicShare">> = (props) => {
  const { updateCell } = useActivityGrid();

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    updateCell(props.row.original.id, "biogenicShare", value === "true" ? true : value === "false" ? false : null);
  };

  return (
    <SelectCell
      width={props.column.getSize()}
      options={options}
      value={String(props.getValue())}
      onValueChange={handleValueChange}
      pinned={props.column.getIsPinned()}
      start={props.column.getStart("left")}
    />
  );
};
