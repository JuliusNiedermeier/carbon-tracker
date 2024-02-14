import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { FC } from "react";
import { ActivityCellContext } from "../../../_utils/cell-types";
import { Cell } from "../../cell";

export const GroupToggleCell: FC<ActivityCellContext<any>> = (props) => {
  return (
    <Cell width={props.column.getSize()} padding={false}>
      <button
        className="flex items-center gap-2 !bg-gray-200 w-full h-full px-3"
        disabled={!props.row.getCanExpand()}
        onClick={props.row.getToggleExpandedHandler()}
      >
        <span className="mr-auto font-medium">{props.getValue()}</span>
        <span className="text-xs text-muted-foreground">{props.row.subRows.length}</span>
        {props.row.getIsExpanded() ? <ChevronsDownUp size="16" /> : <ChevronsUpDown size="16" />}
      </button>
    </Cell>
  );
};
