import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const ScopeHeader: FC<ActivityHeaderContext<"scope.name">> = (props) => {
  return <Header ctx={props} title="Scope" />;
};
