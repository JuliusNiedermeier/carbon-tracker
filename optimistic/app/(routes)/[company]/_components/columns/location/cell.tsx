import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { FC, useState } from "react";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { cn } from "@/app/_utils/cn";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { LocationSelector } from "../../location-selector/location-selector";

export const LocationCell: FC<ActivityCellContext<"locationName">> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Cell width={props.column.getSize()} padding={false}>
        <DialogTrigger className={cn("w-full h-full block whitespace-nowrap px-3 text-left")}>{props.getValue()}</DialogTrigger>
      </Cell>

      <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col gap-0 p-0 border-none overflow-hidden" showCloseButton={false}>
        <LocationSelector activityID={props.row.original.id} />
      </DialogContent>
    </Dialog>
  );
};
