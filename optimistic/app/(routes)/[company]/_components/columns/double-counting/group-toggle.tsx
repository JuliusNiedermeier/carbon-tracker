import { FC } from "react";
import { GroupToggleCellBase } from "../../table-utils/cells/group-toggle-cell-base";
import { ActivityCellContext } from "../../../_utils/cell-types";

export const DoubleCountingGroupToggle: FC<ActivityCellContext<"doubleCounting">> = (props) => {
  const doubleCounting = props.getValue();

  return (
    <GroupToggleCellBase
      width={props.column.getSize()}
      label={doubleCounting === null || doubleCounting === undefined ? "Not provided" : doubleCounting ? "Yes" : "No"}
      subItemCount={props.row.subRows.length}
      expanded={props.row.getIsExpanded()}
      disabled={!props.row.getCanExpand()}
      onClick={props.row.getToggleExpandedHandler()}
      pinned={props.column.getIsPinned()}
      start={props.column.getStart("left")}
    />
  );
};
