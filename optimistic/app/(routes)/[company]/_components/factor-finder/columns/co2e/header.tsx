import { EmissionFactorFinderHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../../cell";

export const CO2eHeader: FC<EmissionFactorFinderHeaderContext<"co2e">> = (props) => {
  return <Cell width={props.header.getSize()} className="border-none">CO2e per unit</Cell>;
};
