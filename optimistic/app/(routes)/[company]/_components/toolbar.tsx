"use client";

import { FC } from "react";
import { Table } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Eye, EyeOff } from "lucide-react";
import { Activity } from "../_hooks/use-activities";

export const Toolbar: FC<{ table: Table<Activity> }> = ({ table }) => {
  const sorting = table.getState().sorting;
  const grouping = table.getState().grouping;

  return (
    <div className="flex gap-4 items-center">
      <h1 className="font-bold mr-auto">Activities</h1>
      <Badge variant="secondary" className="rounded-full">
        {sorting.length} sorted column{sorting.length !== 1 && "s"}
      </Badge>
      <Badge variant="secondary" className="rounded-full">
        {grouping.length} grouped column{grouping.length !== 1 && "s"}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Badge variant="secondary" className="rounded-full">
            {grouping.length} grouped column{grouping.length !== 1 && "s"}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {table.getVisibleLeafColumns().map((column) => (
            <DropdownMenuItem key={column.id} className="gap-4">
              {column.getIsVisible() ? <Eye size="16" /> : <EyeOff size="16" className="opacity-50" />} <span>{column.id}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
