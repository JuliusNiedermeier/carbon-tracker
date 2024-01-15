import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const LocationHeader: FC<ActivityHeaderContext<"locationName">> = (props) => {
  return <Header ctx={props} title="Location" />;
};
