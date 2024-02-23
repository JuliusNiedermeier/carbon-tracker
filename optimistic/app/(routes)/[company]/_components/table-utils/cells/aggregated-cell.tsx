import { FC } from "react";
import { ActivityCellContext } from "../../../_utils/cell-types";
import { Cell } from "../../cell";

export const AggregatedCell: FC<ActivityCellContext<any>> = (props) => {
  return (
    <Cell width={props.column.getSize()} pinned={props.column.getIsPinned()} start={props.column.getStart("left")}>
      {props.getValue()}
    </Cell>
  );
};
