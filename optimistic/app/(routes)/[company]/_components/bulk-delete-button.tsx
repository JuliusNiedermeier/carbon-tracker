import { Table } from "@tanstack/react-table";
import { FC, useState } from "react";
import { Loader2, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Activity } from "../_hooks/use-activities";
import { deleteActivities } from "../_server-actions/delete-activities";

interface Props {
  table: Table<Activity>;
}

export const BulkDeleteButton: FC<Props> = ({ table }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const selectedCount = table.getSelectedRowModel().rows.length;

  const selectedIds = table.getSelectedRowModel().rows.map((row) => row.original.id);

  const buttonLabel = `Delete ${selectedCount} ${selectedCount > 1 ? "rows" : "row"}`;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteActivities(selectedIds);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-3">
          <Trash size={16} />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[20rem]">
        <DialogHeader>
          <DialogTitle>Please confirm.</DialogTitle>
          <DialogDescription>You are about to {buttonLabel}. You cannot restore them! Are you sure you want to delete all selected activities?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" className="w-full gap-4" onClick={handleDelete} disabled={loading}>
            {buttonLabel}
            {loading && <Loader2 size={20} className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
