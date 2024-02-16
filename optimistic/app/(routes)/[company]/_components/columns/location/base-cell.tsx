import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ComponentProps, FC, useState } from "react";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { cn } from "@/app/_utils/cn";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { LocationSelector } from "../../location-selector/location-selector";
import { useLocation } from "../../../_hooks/use-location";

export type Props = {
  width: number;
  locationID: ComponentProps<typeof LocationSelector>["currentLocationID"];
  companyID: ComponentProps<typeof LocationSelector>["currentCompanyID"];
  onSelect: ComponentProps<typeof LocationSelector>["onSelect"];
};

export const LocationBaseCell: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const { data: location } = useLocation(props.locationID);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Cell width={props.width} padding={false}>
        <DialogTrigger className={cn("w-full h-full block whitespace-nowrap px-3 text-left")}>{location?.name}</DialogTrigger>
      </Cell>

      <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col gap-0 p-0 border-none overflow-hidden" showCloseButton={false}>
        <LocationSelector onSelect={props.onSelect} currentLocationID={props.locationID} currentCompanyID={props.companyID} />
      </DialogContent>
    </Dialog>
  );
};
