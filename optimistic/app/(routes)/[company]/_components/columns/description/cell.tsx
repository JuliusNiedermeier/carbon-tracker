import { ComponentProps, FC } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { TransitionInput } from "../../../../../_components/transition-input";

export const DescriptionCell: FC<ActivityCellContext<"description">> = (props) => {
  const handleUpdate: ComponentProps<typeof TransitionInput>["onInput"] = (value) => {
    props.table.options.meta?.updateCell(props.row.original.id, "description", value);
  };
  return <TransitionInput value={props.getValue()} onInput={handleUpdate} />;
};
