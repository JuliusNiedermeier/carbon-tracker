import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const FactorHeader: FC<ActivityHeaderContext<"factor.co2e">> = (props) => {
  return <Header ctx={props} title="Emission factor" />;
};
