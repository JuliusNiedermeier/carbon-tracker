import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const DescriptionHeader: FC<ActivityHeaderContext<"description">> = (props) => {
  return <Header ctx={props} title="Description" />;
};
