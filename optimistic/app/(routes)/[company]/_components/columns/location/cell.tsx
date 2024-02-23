import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { ComponentProps, FC } from "react";
import { useActivityGrid } from "../../providers/activity-grid-provider";
import { LocationBaseCell } from "./base-cell";

export const LocationCell: FC<ActivityCellContext<"locationName">> = (props) => {
  const { updateCell } = useActivityGrid();

  const handleSelect: ComponentProps<typeof LocationBaseCell>["onSelect"] = (locationID) => {
    updateCell(props.row.original.id, "locationId", locationID);
  };

  return (
    <LocationBaseCell
      width={props.column.getSize()}
      pinned={props.column.getIsPinned()}
      start={props.column.getStart("left")}
      locationName={props.getValue()}
      locationID={props.row.original.locationId}
      companyID={props.row.original.companyId}
      onSelect={handleSelect}
    />
  );
};
