import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const DoubleCountingHeader: FC<ActivityHeaderContext<"doubleCounting">> = (props) => {
  return <Header ctx={props} title="Double counting" />;
};
