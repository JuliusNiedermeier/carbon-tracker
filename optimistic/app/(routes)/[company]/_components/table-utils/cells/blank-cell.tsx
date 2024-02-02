import { FC } from "react";
import { Cell } from "../../cell";
import { ActivityDisplayHeaderContext, ActivityHeaderContext } from "../../../_utils/cell-types";

export const BlankCell: FC<ActivityDisplayHeaderContext> = (props) => {
  return (
    <Cell width={props.header.getSize()} className="pointer-events-none">
      -
    </Cell>
  );
};
