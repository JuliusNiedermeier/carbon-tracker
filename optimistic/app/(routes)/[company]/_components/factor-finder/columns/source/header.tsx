import { EmissionFactorFinderHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../../cell";

export const SourceHeader: FC<EmissionFactorFinderHeaderContext<"emissionFactorSource.name">> = (props) => {
  return <Cell width={props.header.getSize()} className="border-none">Publisher</Cell>;
};
