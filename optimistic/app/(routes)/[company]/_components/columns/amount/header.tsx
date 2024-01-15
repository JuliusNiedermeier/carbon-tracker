import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const AmountHeader: FC<ActivityHeaderContext<"amount">> = (props) => {
  return <Header ctx={props} title="Amount" />;
};
