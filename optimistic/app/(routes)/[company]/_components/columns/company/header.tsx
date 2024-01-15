import { FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { Header } from "../../table-utils/headers/header";

export const CompanyHeader: FC<ActivityHeaderContext<"companyName">> = (props) => {
  return <Header ctx={props} title="Company" />;
};
