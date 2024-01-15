import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const Co2eHeader: FC<ActivityHeaderContext<"co2e">> = (props) => {
  return <Header ctx={props} title="CO²e emission" />;
};
