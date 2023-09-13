import { Badge } from "@/common/components/ui/badge";
import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";

interface Props {
  factor: number | null;
}

export const FactorCell: FC<Props> = ({ factor }) => {
  const notANumber = factor === null || isNaN(factor);

  return (
    <TableCell className="text-right">
      <Badge variant={notANumber ? "secondary" : "default"} className="w-full justify-end font-mono font-medium">
        {notANumber ? "Not available" : factor.toFixed(2)}
      </Badge>
    </TableCell>
  );
};
