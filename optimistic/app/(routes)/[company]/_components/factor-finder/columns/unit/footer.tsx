import { EmissionFactorFinderDisplayHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../cell";
import { useFactorFinder } from "../../factor-finder";

export const UnitFooter: FC<EmissionFactorFinderDisplayHeaderContext> = (props) => {
  const { selectedFactorInfo } = useFactorFinder();

  return (
    <Cell width={props.column.getSize()} className="flex-col justify-center items-start gap-1 font-medium">
      {selectedFactorInfo?.unit?.abbreviation}
    </Cell>
  );
};
