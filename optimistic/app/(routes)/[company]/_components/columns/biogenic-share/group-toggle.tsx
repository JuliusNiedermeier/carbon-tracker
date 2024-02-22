import { FC } from "react";
import { GroupToggleCellBase } from "../../table-utils/cells/group-toggle-cell-base";
import { ActivityCellContext } from "../../../_utils/cell-types";

export const BiogenicShareGroupToggle: FC<ActivityCellContext<"biogenicShare">> = (props) => {
  const biogenicShare = props.getValue();

  return (
    <GroupToggleCellBase
      width={props.column.getSize()}
      label={biogenicShare === null || biogenicShare === undefined ? "Not provided" : biogenicShare ? "Yes" : "No"}
      subItemCount={props.row.subRows.length}
      expanded={props.row.getIsExpanded()}
      disabled={!props.row.getCanExpand()}
      onClick={props.row.getToggleExpandedHandler()}
    />
  );
};
