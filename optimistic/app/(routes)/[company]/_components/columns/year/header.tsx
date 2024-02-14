import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const YearHeader: FC<ActivityHeaderContext<"year">> = (props) => {
  return <Header ctx={props} title="Year" />;
};
