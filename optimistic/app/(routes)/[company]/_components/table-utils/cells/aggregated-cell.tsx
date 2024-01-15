import { FC } from "react";
import { ActivityCellContext } from "../../../_utils/cell-types";

export const AggregatedCell: FC<ActivityCellContext<any>> = (props) => {
  return <div className="cell">{props.getValue()}</div>;
};
