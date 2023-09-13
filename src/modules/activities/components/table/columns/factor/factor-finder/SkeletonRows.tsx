import { Skeleton } from "@/common/components/ui/skeleton";
import { TableCell, TableRow } from "@/common/components/ui/table";
import { FC } from "react";

export const SkeletonRow: FC = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
    </TableRow>
  );
};
