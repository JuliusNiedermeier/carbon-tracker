import { Badge } from "@/common/components/ui/badge";
import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";

interface Props {
  unit: string;
}

export const UnitCell: FC<Props> = ({ unit }) => {
  return (
    <TableCell className="py-2 px-5">
      <Badge>{unit}</Badge>
    </TableCell>
  );
};
