import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const UnitHeader: FC<ActivityHeaderContext<"unit.abbreviation">> = (props) => {
  return <Header ctx={props} title="Unit" />;
};
