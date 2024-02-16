import { FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { useActivityGrid } from "../../providers/activity-grid-provider";
import { useCorporateGroup } from "../../../_hooks/use-corporate-group";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { useLocation } from "../../../_hooks/use-location";

export const CompanyFooter: FC<ActivityHeaderContext<"companyName">> = (props) => {
  const { rootCompanySlug } = useActivityGrid();
  const { data: corporateGroup } = useCorporateGroup(rootCompanySlug);

  const { candidate } = useActivityCreator();

  const { data: location } = useLocation(candidate.locationId ?? null);

  const companyName = corporateGroup?.members?.find((member) => member.id === location?.companyId)?.name;

  return <Cell width={props.column.getSize()}>{companyName}</Cell>;
};
