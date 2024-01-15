import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const BiogenicShareHeader: FC<ActivityHeaderContext<"biogenicShare">> = (props) => {
  return <Header ctx={props} title="Biogenic share" />;
};
