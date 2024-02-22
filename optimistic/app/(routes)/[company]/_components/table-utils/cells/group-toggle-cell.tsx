import { FC } from "react";
import { ActivityCellContext } from "../../../_utils/cell-types";
import { GroupToggleCellBase } from "./group-toggle-cell-base";

export const GroupToggleCell: FC<ActivityCellContext<any>> = (props) => {
  return (
    <GroupToggleCellBase
      width={props.column.getSize()}
      label={props.getValue() ?? "Empty"}
      subItemCount={props.row.subRows.length}
      expanded={props.row.getIsExpanded()}
      disabled={!props.row.getCanExpand()}
      onClick={props.row.getToggleExpandedHandler()}
    />
  );
};
