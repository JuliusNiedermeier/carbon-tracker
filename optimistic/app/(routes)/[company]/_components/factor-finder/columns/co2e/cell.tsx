import { EmissionFactorFinderCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../cell";
import { EmissionFactorValue } from "../../../columns/factor/emission-factor-value";

export const CO2eCell: FC<EmissionFactorFinderCellContext<"co2e">> = (props) => {
  return (
    <Cell width={props.column.getSize()}>
      <EmissionFactorValue value={props.getValue()} />
    </Cell>
  );
};
