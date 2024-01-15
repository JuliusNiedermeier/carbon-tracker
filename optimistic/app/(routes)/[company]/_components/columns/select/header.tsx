import { FC } from "react";
import { ActivityDisplayHeaderContext, ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";
import { Checkbox } from "@/app/_components/ui/checkbox";

export const SelectHeader: FC<ActivityDisplayHeaderContext> = (props) => {
  return (
    <div className="header">
      <Checkbox />
    </div>
  );
};
