import { EmissionFactorFinderHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../../cell";

export const YearHeader: FC<EmissionFactorFinderHeaderContext<"year">> = (props) => {
  return (
    <Cell width={props.header.getSize()} className="border-none">
      Year
    </Cell>
  );
};
