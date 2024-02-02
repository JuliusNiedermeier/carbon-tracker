import { EmissionFactorFinderCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../cell";

export const UnitCell: FC<EmissionFactorFinderCellContext<"unit.abbreviation">> = (props) => {
  return (
    <Cell width={props.column.getSize()} className="flex-col justify-center items-start gap-1">
      {props.getValue()}
    </Cell>
  );
};
