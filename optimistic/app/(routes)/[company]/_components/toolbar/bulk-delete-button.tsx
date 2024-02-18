"use client";

import { Table } from "@tanstack/react-table";
import { ComponentProps, FC, useState } from "react";
import { Loader2, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Activity } from "../../_hooks/use-activities";
import { useDeleteActivities } from "../../_hooks/use-delete-activities";
import { useActivityGrid } from "../providers/activity-grid-provider";

interface Props {
  table: Table<Activity>;
}

export const BulkDeleteButton: FC<Props> = ({ table }) => {
  const { rootCompanySlug } = useActivityGrid();
  const [open, setOpen] = useState(false);

  const selectedCount = table.getSelectedRowModel().rows.length;

  const selectedIds = table.getSelectedRowModel().rows.map((row) => row.original.id);

  const buttonLabel = `Delete ${selectedCount} ${selectedCount > 1 ? "rows" : "row"}`;

  const { mutateAsync: deleteActivities, isPending: isDeleting } = useDeleteActivities();

  const handleDeleteButtonClick: ComponentProps<typeof Button>["onClick"] = async () => {
    await deleteActivities({ IDs: selectedIds, rootCompanySlug });
    setOpen(false);
    table.setRowSelection({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="gap-3">
          <Trash size={16} />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[20rem]">
        <DialogHeader>
          <DialogTitle>Please confirm.</DialogTitle>
          <DialogDescription>
            You are about to {buttonLabel}. You cannot restore them! Are you sure you want to delete all selected activities?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" className="w-full gap-4" onClick={handleDeleteButtonClick} disabled={isDeleting}>
            {buttonLabel}
            {isDeleting && <Loader2 size={20} className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
