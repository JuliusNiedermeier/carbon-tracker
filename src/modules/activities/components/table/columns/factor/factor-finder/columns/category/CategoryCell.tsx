import { Badge } from "@/common/components/ui/badge";
import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";

interface Props {
  categories: string[];
}

export const CategoryCell: FC<Props> = ({ categories }) => {
  return (
    <TableCell className="font-mono flex gap-1 whitespace-nowrap flex-wrap">
      {categories.map((category: any, index) => (
        <Badge key={index} variant="outline">
          {category}
        </Badge>
      ))}
    </TableCell>
  );
};
