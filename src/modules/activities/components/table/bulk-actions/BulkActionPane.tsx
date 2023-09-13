import { Table } from "@tanstack/react-table";
import { FC } from "react";
import { JoinedActivity } from "../ActivityTable";
import { DeleteSelection } from "./DeleteSelection";

interface Props {
  table: Table<JoinedActivity>;
}

export const BulkActionPane: FC<Props> = ({ table }) => {
  return (
    <div className="flex items-center gap-4 ml-auto">
      <DeleteSelection table={table} />
    </div>
  );
};
