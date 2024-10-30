import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { ComponentProps, FC } from "react";
import { LocationBaseCell } from "./base-cell";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { useLocation } from "../../../_hooks/use-location";
import { FooterCell } from "../../table-utils/cells/footer-cell";

export const LocationFooter: FC<ActivityHeaderContext<"locationName">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();

  const { data: location } = useLocation(candidate.locationId ?? null);

  const handleSelect: ComponentProps<typeof LocationBaseCell>["onSelect"] = (locationID) => {
    setCandidate((candidate) => ({ ...candidate, locationId: locationID }));
  };

  return (
    <FooterCell columnID={props.column.id} width={props.column.getSize()}>
      <LocationBaseCell
        width={props.column.getSize()}
        pinned={props.column.getIsPinned()}
        start={props.column.getStart("left")}
        locationName={location?.name || ""}
        locationID={candidate.locationId ?? null}
        companyID={location?.companyId ?? null}
        onSelect={handleSelect}
      />
    </FooterCell>
  );
};
