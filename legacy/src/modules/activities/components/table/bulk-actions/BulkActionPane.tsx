import { Table } from "@tanstack/react-table";
import { FC } from "react";
import { DeleteSelection } from "./DeleteSelection";
import { ActivityTableData } from "../ActivityTable";

interface Props {
  table: Table<ActivityTableData>;
}

export const BulkActionPane: FC<Props> = ({ table }) => {
  return (
    <div className="flex items-center gap-4 ml-auto">
      <DeleteSelection table={table} />
    </div>
  );
};
