import { FC } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../common/components/ui/dropdown-menu";
import { Button } from "../../../../common/components/ui/button";
import { ListOrdered } from "lucide-react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { JoinedActivity } from "./ActivityTable";

interface Props {
  table: Table<JoinedActivity>;
}

export const SortOrderSwitcher: FC<Props> = ({ table }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-3">
          <ListOrdered size={16} />
          Sort order
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          {table.getState().sorting.map((sortItem) => (
            <DropdownMenuItem key={sortItem.id} className="gap-2 flex-1">
              <DragHandleDots2Icon className="text-muted-foreground" />
              <span className="flex-1 mr-4">{sortItem.id}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
